import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeOffRequest, RequestStatus } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';

import { BalancesService } from '../balances/balances.service';
import { HcmService } from '../hcm/hcm.service';
import { LedgerService } from '../ledger/ledger.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(TimeOffRequest)
    private readonly repo: Repository<TimeOffRequest>,
    private readonly balancesService: BalancesService,
    private readonly hcmService: HcmService,
    private readonly ledgerService: LedgerService
  ) {}

  async create(dto: CreateRequestDto) {
    await this.balancesService.reserve(
      dto.employeeId,
      dto.locationId,
      dto.days
    );

    const request = await this.repo.save(
      this.repo.create({
        ...dto,
        status: RequestStatus.PENDING
      })
    );

    try {
      const hcm = await this.hcmService.validate(dto);

      request.status = RequestStatus.APPROVED;
      request.externalReference = hcm.referenceId;

      await this.repo.save(request);

      await this.balancesService.finalize(
        dto.employeeId,
        dto.locationId,
        dto.days
      );

      await this.ledgerService.create({
        employeeId: dto.employeeId,
        locationId: dto.locationId,
        action: 'TIME_OFF_APPROVED',
        amount: dto.days,
        source: 'ExampleHR',
        referenceId: request.id
      });

      return request;
    } catch (e) {
      await this.balancesService.release(
        dto.employeeId,
        dto.locationId,
        dto.days
      );

      request.status = RequestStatus.SYNC_PENDING;

      return this.repo.save(request);
    }
  }
}