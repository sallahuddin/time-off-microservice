import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ledger } from './ledger.entity';

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(Ledger)
    private readonly repo: Repository<Ledger>
  ) {}

  async create(data: Partial<Ledger>) {
    return this.repo.save(this.repo.create(data));
  }
}