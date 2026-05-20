import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Balance } from './balances/balance.entity';
import { TimeOffRequest } from './requests/request.entity';
import { Ledger } from './ledger/ledger.entity';

import { BalancesModule } from './balances/balances.module';
import { RequestsModule } from './requests/requests.module';
import { LedgerModule } from './ledger/ledger.module';
import { HcmModule } from './hcm/hcm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Balance, TimeOffRequest, Ledger]
    }),
    BalancesModule,
    RequestsModule,
    LedgerModule,
    HcmModule
  ]
})
export class AppModule {}