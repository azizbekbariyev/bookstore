import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSuppliersDto } from './dto/create-supplier.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi yetkazib beruvchi qo‘shish' })
  create(@Body() createSupplierDto: CreateSuppliersDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha yetkazib beruvchilarni olish' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini topish' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini yangilash' })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
