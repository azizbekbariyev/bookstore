import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookStoreService } from './book_store.service';
import { CreateBookStoreDto } from './dto/create-book_store.dto';
import { UpdateBookStoreDto } from './dto/update-book_store.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('book-store')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kitob do‘koni ma\'lumotini yaratish' })
  create(@Body() createBookStoreDto: CreateBookStoreDto) {
    return this.bookStoreService.create(createBookStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kitob do‘konlarini olish' })
  findAll() {
    return this.bookStoreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘konini olish' })
  findOne(@Param('id') id: string) {
    return this.bookStoreService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘koni ma\'lumotini yangilash' })
  update(@Param('id') id: string, @Body() updateBookStoreDto: UpdateBookStoreDto) {
    return this.bookStoreService.update(+id, updateBookStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob do‘konini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.bookStoreService.remove(+id);
  }
}
