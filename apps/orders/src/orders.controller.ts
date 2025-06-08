import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('orders.create')
  create(
    @Payload()
    { data }: { data: { createOrderDto: CreateOrderDto } },
  ) {
    this.ordersService.create(data.createOrderDto);
  }

  @MessagePattern('orders.findAll')
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('orders.findOne')
  async findOne(@Payload() { data: { id } }: { data: { id: number } }) {
    return await this.ordersService.findOne(id);
  }

  @EventPattern('orders.update')
  update(
    @Payload()
    { data }: { data: { id: number; updateOrderDto: UpdateOrderDto } },
  ) {
    if (Object.keys(data.updateOrderDto).length)
      this.ordersService.update(data.id, data.updateOrderDto);
  }

  @EventPattern('orders.remove')
  remove(@Payload() { data: { id } }: { data: { id: number } }) {
    this.ordersService.remove(id);
  }
}
