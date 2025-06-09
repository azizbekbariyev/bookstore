import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Author } from '../../authors/entities/author.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('book_author')
export class BookAuthor {
  @ApiProperty({ example: 1, description: 'Unique identifier for the book-author relation' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Book, description: 'The book entity associated with this relation' })
  @ManyToOne(() => Book, (book) => book.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ApiProperty({ type: () => Author, description: 'The author entity associated with this relation' })
  @ManyToOne(() => Author, (author) => author.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
