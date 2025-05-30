import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookAuthorService } from './book_author.service';
import { CreateBookAuthorDto } from './dto/create-book_author.dto';
import { UpdateBookAuthorDto } from './dto/update-book_author.dto';

@Controller('book-author')
export class BookAuthorController {
  constructor(private readonly bookAuthorService: BookAuthorService) {}

  @Post()
  create(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    return this.bookAuthorService.create(createBookAuthorDto);
  }

  @Get()
  findAll() {
    return this.bookAuthorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookAuthorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookAuthorDto: UpdateBookAuthorDto) {
    return this.bookAuthorService.update(+id, updateBookAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookAuthorService.remove(+id);
  }
}
