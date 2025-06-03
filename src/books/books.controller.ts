import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kitob yaratish' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kitoblarni olish' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitobni olish' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitob ma\'lumotini yangilash' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kitobni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
