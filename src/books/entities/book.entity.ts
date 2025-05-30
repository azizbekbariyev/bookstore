import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookStore } from "../../book_store/entities/book_store.entity";
import { Genre } from "../../genre/entities/genre.entity";
import { Review } from "../../reviews/entities/review.entity";
import { BookAuthor } from "../../book_author/entities/book_author.entity";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: "Unique identifier for the book" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 9783161484100,
    description: "International Standard Book Number",
  })
  @Column({ type: "bigint" })
  isbn: number;

  @ApiProperty({
    example: "The Great Gatsby",
    description: "Title of the book",
  })
  @Column({ type: "varchar" })
  title: string;

  @ApiProperty({ example: 15.99, description: "Price of the book" })
  @Column({ type: "decimal" })
  price: number;

  @ApiProperty({
    example: 120,
    description: "Available stock quantity",
    required: false,
  })
  @Column({ type: "int", nullable: true })
  stock_quantity?: number;

  @ApiProperty({
    example: "2023-10-12",
    description: "Publication date",
    required: false,
  })
  @Column({ type: "date", nullable: true })
  publication_date?: Date;

  @ApiProperty({
    example: 300,
    description: "Number of pages in the book",
    required: false,
  })
  @Column({ type: "int", nullable: true })
  pages?: number;

  @ApiProperty({
    example: "English",
    description: "Language of the book",
    required: false,
  })
  @Column({ type: "varchar", nullable: true })
  language?: string;

  @ApiProperty({
    example: "2025-05-28T13:00:00+05:00",
    description: "Creation timestamp",
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    example: "2025-05-28T13:30:00+05:00",
    description: "Last updated timestamp",
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;

  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book)
  bookAuthors: BookAuthor[];

  @OneToMany(() => BookStore, (bookStore) => bookStore.book)
  bookStores: BookStore[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.book)
  orders: Order[];
}
