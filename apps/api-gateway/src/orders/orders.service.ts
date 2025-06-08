import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CLIENTS } from '../utils/constants/tokens';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly ordersTopics = ['orders.findAll', 'orders.findOne'];

  constructor(
    @Inject(KAFKA_CLIENTS.ORDERS_SERVICE)
    private readonly client: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const client = this.client as ClientKafkaProxy;
    this.ordersTopics.forEach((topic) => client.subscribeToResponseOf(topic));
  }

  create(createOrderDto: CreateOrderDto) {
    this.client.emit('orders.create', {
      data: { createOrderDto },
    });
    return { message: 'Order added successfully' };
  }

  findAll() {
    return this.client.send('orders.findAll', {});
  }

  async findOne(id: number) {
    const data = await firstValueFrom(
      this.client.send('orders.findOne', { data: { id } }),
    );
    if (!data) throw new NotFoundException();
    return data;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    this.client.emit('orders.update', {
      data: { id, updateOrderDto },
    });
    return { message: 'Order updated successfully' };
  }

  remove(id: number) {
    this.client.emit('orders.remove', { data: { id } });
    return { message: 'Order removed successfully' };
  }
}
