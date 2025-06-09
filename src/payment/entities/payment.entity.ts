import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Payment {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the payment",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 99.99,
    description: "Amount of the payment",
  })
  @Column({ type: "decimal" })
  amount: string;

  @ApiProperty({
    example: "Credit Card",
    description: "Payment method used",
  })
  @Column()
  payment_method: string;

  @ApiProperty({
    example: "2025-05-29",
    description: "Date of the payment",
  })
  @Column({ type: "date" })
  payment_date: string;

  @ApiProperty({
    example: 1,
    description: "ID of the order",
  })
  @Column()
  orderId: number;

  @ApiProperty({
    example: true,
    description: "Status of the payment",
  })
  @Column()
  status: boolean;

  @ManyToOne(() => Order, (order) => order.payments, {onDelete:"CASCADE"})
  @JoinColumn({ name: "orderId" })
  order: Order;
}
