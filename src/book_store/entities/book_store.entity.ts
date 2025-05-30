import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "../../address/entities/address.entity";
import { Book } from "../../books/entities/book.entity";
import { Order } from "../../order/entities/order.entity";
import { Worker } from "../../worker/entities/worker.entity";

@Entity()
export class BookStore {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the book store",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "store@example.com",
    description: "Email address of the book store",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Phone number of the book store",
  })
  @Column()
  phone_number: string;

  @ApiProperty({
    example: "9:00 AM - 6:00 PM",
    description: "Operating hours of the book store",
  })
  @Column()
  operating_hours: string;

  @ApiProperty({
    example: "Central Book Store",
    description: "Name of the book store",
  })
  @Column()
  name: string;

  @ApiPropertyOptional({
    example: 1,
    description: "ID of the address associated with the book store",
  })
  @Column({ nullable: true })
  address_id?: number;

  @ManyToOne(() => Address, (address) => address.bookStores)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @ApiPropertyOptional({
    example: 1,
    description: "ID of the worker associated with the book store",
  })
  @Column({ nullable: true })
  worker_id?: number;

  @OneToMany(() => Worker, (worker) => worker.bookStore)
  workers: Worker[];

  @ApiPropertyOptional({
    example: 1,
    description: "ID of the book associated with the book store",
  })
  @Column({ nullable: true })
  book_id?: number;

  @ManyToOne(() => Book, (book) => book.bookStores)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @OneToMany(() => Order, (order) => order.bookStore)
  orders: Order[];
}