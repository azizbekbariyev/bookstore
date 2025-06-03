import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi yetkazib berish maʼlumotini yaratish' })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha yetkazib berish maʼlumotlarini olish' })
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib berish maʼlumotini olish' })
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib berish maʼlumotini yangilash' })
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib berish maʼlumotini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
