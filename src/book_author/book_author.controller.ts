import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookAuthorService } from './book_author.service';
import { CreateBookAuthorDto } from './dto/create-book_author.dto';
import { UpdateBookAuthorDto } from './dto/update-book_author.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('book-author')
export class BookAuthorController {
  constructor(private readonly bookAuthorService: BookAuthorService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi book-author bog‘lanishini yaratish' })
  create(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    return this.bookAuthorService.create(createBookAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha book-author bog‘lanishlarini olish' })
  findAll() {
    return this.bookAuthorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha book-author bog‘lanishini olish' })
  findOne(@Param('id') id: string) {
    return this.bookAuthorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha book-author bog‘lanishini yangilash' })
  update(@Param('id') id: string, @Body() updateBookAuthorDto: UpdateBookAuthorDto) {
    return this.bookAuthorService.update(+id, updateBookAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha book-author bog‘lanishini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.bookAuthorService.remove(+id);
  }
}
