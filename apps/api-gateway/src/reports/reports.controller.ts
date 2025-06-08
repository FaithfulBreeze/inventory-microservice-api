import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('orders')
  findAllOrders() {
    return this.reportsService.findAllOrders();
  }

  @Get('storage')
  findAllStorage() {
    return this.reportsService.findAllStorage();
  }
}
