import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BalancesService } from './balances.service';

@Controller('balances')
export class BalancesController {
  constructor(private readonly service: BalancesService) {}

  @Get(':employeeId/:locationId')
  get(
    @Param('employeeId') employeeId: string,
    @Param('locationId') locationId: string
  ) {
    return this.service.get(employeeId, locationId);
  }

  @Post('sync')
  sync(@Body() body: any) {
    return this.service.sync(
      body.employeeId,
      body.locationId,
      body.balance
    );
  }
}