import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReportsModule } from './reports/reports.module';
import { OrdersModule } from './orders/orders.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [OrdersModule, StorageModule, ProductsModule, ReportsModule],
})
export class AppModule {}
