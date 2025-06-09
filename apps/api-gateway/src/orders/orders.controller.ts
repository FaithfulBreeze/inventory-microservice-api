import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(202)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id/ship')
  @HttpCode(202)
  updateOrderStatusToShipped(@Param('id') id: string) {
    const updateOrderDto = new UpdateOrderDto();
    updateOrderDto.status = 'SHIPPED';
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch(':id/confirm')
  @HttpCode(202)
  updateOrderStatusToDelivered(@Param('id') id: string) {
    const updateOrderDto = new UpdateOrderDto();
    updateOrderDto.status = 'DELIVERED';
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(202)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
