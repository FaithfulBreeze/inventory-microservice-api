import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { ProductsService } from '../products/products.service';
import { firstValueFrom } from 'rxjs';
import { Product } from 'apps/products/src/entities/product.entity';
import { Storage } from 'apps/storage/src/entities/storage.entity';
import { OrdersService } from '../orders/orders.service';
import { Order } from 'apps/orders/src/entities/order.entity';
@Injectable()
export class ReportsService {
  constructor(
    private readonly storageService: StorageService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async findAllOrders() {
    const products = await firstValueFrom<Product[]>(
      this.productsService.findAll(),
    );

    const orders = await firstValueFrom<Order[]>(this.ordersService.findAll());

    return orders.map((order) => ({
      ...order,
      product: {
        ...(products.find(({ id }) => id === order.productId) || null),
      },
    }));
  }

  async findAllStorage() {
    const products = await firstValueFrom<Product[]>(
      this.productsService.findAll(),
    );

    const storage = await firstValueFrom<Storage[]>(
      this.storageService.findAll(),
    );

    return storage.map((entry) => ({
      ...entry,
      product: {
        ...(products.find(({ id }) => id === entry.productId) || null),
      },
    }));
  }
}
