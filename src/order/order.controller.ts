import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha buyurtma maʼlumotini olish' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha buyurtma maʼlumotini yangilash' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha buyurtmani o‘chirish' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
