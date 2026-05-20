import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Balance)
    private readonly repo: Repository<Balance>,
  ) {}

  async get(employeeId: string, locationId: string) {
    const balance = await this.repo.findOne({
      where: { employeeId, locationId }
    });

    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    return {
      ...balance,
      availableBalance:
        balance.totalBalance - balance.reservedBalance
    };
  }

  async reserve(employeeId: string, locationId: string, days: number) {
    const balance = await this.repo.findOne({
      where: { employeeId, locationId }
    });

    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    const available =
      balance.totalBalance - balance.reservedBalance;

    if (available < days) {
      throw new BadRequestException('Insufficient balance');
    }

    balance.reservedBalance += days;

    return this.repo.save(balance);
  }

  async finalize(employeeId: string, locationId: string, days: number) {
    const balance = await this.repo.findOne({
      where: { employeeId, locationId }
    });

    balance.reservedBalance -= days;
    balance.totalBalance -= days;

    return this.repo.save(balance);
  }

  async release(employeeId: string, locationId: string, days: number) {
    const balance = await this.repo.findOne({
      where: { employeeId, locationId }
    });

    balance.reservedBalance -= days;

    return this.repo.save(balance);
  }

  async sync(employeeId: string, locationId: string, amount: number) {
    let balance = await this.repo.findOne({
      where: { employeeId, locationId }
    });

    if (!balance) {
      balance = this.repo.create({
        employeeId,
        locationId,
        totalBalance: amount
      });
    } else {
      balance.totalBalance = amount;
    }

    return this.repo.save(balance);
  }
}