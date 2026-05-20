import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeOffRequest } from './request.entity';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

import { BalancesModule } from '../balances/balances.module';
import { HcmModule } from '../hcm/hcm.module';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeOffRequest]),
    BalancesModule,
    HcmModule,
    LedgerModule
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}