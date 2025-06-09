import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Genre } from '../genre/entities/genre.entity';
import { BookStore } from '../book_store/entities/book_store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Genre,
      BookStore
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}