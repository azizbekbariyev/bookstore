import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Book } from "../../books/entities/book.entity";
import { Customer } from "../../customer/entities/customer.entity";

@Entity()
export class Review {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the review",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the book associated with the review",
  })
  @Column()
  book_id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the customer who wrote the review",
  })
  @Column()
  customer_id: number;

  @ApiProperty({
    example: 4,
    description: "Rating given by the customer (1-5)",
  })
  @Column()
  rating: number;

  @ApiProperty({
    example: "Great book, highly recommend!",
    description: "Text content of the review",
  })
  @Column({ type: "text" })
  review_text: string;

  @ApiProperty({
    example: "2025-05-29 12:11:00",
    description: "Date and time when the review was created",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  review_date: Date;

  @ApiProperty({
    example: true,
    description: "Indicates if the review is from a verified purchase",
  })
  @Column({ default: false })
  verified_purchase: boolean;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  customer: Customer;
}
