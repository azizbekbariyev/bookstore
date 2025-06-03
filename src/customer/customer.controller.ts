import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mijoz yaratish' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mijozlarni olish' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mijozni olish' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mijoz ma\'lumotini yangilash' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mijozni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
