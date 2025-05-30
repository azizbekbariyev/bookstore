import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Payment } from "../../payment/entities/payment.entity";
import { Suppliers } from "../../suppliers/entities/supplier.entity";
import { Book } from "../../books/entities/book.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { Delivery } from "../../delivery/entities/delivery.entity";
import { BookStore } from "../../book_store/entities/book_store.entity";

@Entity()
export class Order {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the order",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the supplier",
  })
  @Column()
  suppliers_id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the book store",
  })
  @Column()
  book_store_id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the book",
  })
  @Column()
  book_id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the customer",
  })
  @Column()
  customer_id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the delivery",
  })
  @Column()
  delivery_id: number;

  @ApiProperty({
    example: "TRACK123456",
    description: "Tracking number of the order",
  })
  @Column({ type: "text" })
  tracking_number: string;

  @ApiProperty({
    example: 99.99,
    description: "Total amount of the order",
  })
  @Column({ type: "decimal" })
  total_amount: number;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @ManyToOne(() => BookStore, (bookStore) => bookStore.orders)
  @JoinColumn()
  bookStore: BookStore;

  @ManyToOne(() => Book, (book) => book.orders)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders)
  @JoinColumn()
  delivery: Delivery;
}
