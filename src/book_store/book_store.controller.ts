import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookStoreService } from './book_store.service';
import { CreateBookStoreDto } from './dto/create-book_store.dto';
import { UpdateBookStoreDto } from './dto/update-book_store.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtActiveGuard } from '../common/guards/jwt-active.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/jwt-role.guard';

@ApiBearerAuth()
@Controller('book-store')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  // @Roles("superadmin")
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtActiveGuard)
  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi kitob do‘koni ma\'lumotini yaratish' })
  create(@Body() createBookStoreDto: CreateBookStoreDto) {
    return this.bookStoreService.create(createBookStoreDto);
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha kitob do‘konlarini olish' })
  findAll() {
    return this.bookStoreService.findAll();
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘konini olish' })
  findOne(@Param('id') id: string) {
    return this.bookStoreService.findOne(+id);
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘koni ma\'lumotini yangilash' })
  update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
    return this.bookStoreService.update(+id, updateBookStoreDto);
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘konini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.bookStoreService.remove(+id);
  }
}
