import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi manzil yaratish' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha manzillarni olish' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha bitta manzilni olish' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha manzilni yangilash' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha manzilni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}