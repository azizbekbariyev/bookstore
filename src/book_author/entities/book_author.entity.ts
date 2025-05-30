// book-author.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class BookAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.bookAuthors)
  book: Book;

  @ManyToOne(() => Author, (author) => author.bookAuthors)
  author: Author;
}
