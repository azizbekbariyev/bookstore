import { Module } from '@nestjs/common';
import { BookAuthorService } from './book_author.service';
import { BookAuthorController } from './book_author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/book.entity';
import { BookAuthor } from './entities/book_author.entity';
import { Author } from '../authors/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookAuthor, Author]),
  ],
  controllers: [BookAuthorController],
  providers: [BookAuthorService],
})
export class BookAuthorModule {}
