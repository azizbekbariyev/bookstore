import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSuppliersDto } from './dto/create-supplier.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtActiveGuard } from '../common/guards/jwt-active.guard';
import { RolesGuard } from '../common/guards/jwt-role.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Roles('superadmin', "admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi yetkazib beruvchi qo‘shish' })
  create(@Body() createSupplierDto: CreateSuppliersDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Roles('admin', 'superadmin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha yetkazib beruvchilarni olish' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini topish' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini yangilash' })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha yetkazib beruvchini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
