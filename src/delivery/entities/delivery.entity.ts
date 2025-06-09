import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Suppliers } from "../../suppliers/entities/supplier.entity";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Delivery {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the delivery",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "123 Delivery St",
    description: "Delivery address",
  })
  @Column()
  delivery_address: string;

  @ApiProperty({
    example: "456 Received St",
    description: "Received address",
  })
  @Column()
  received_address: string;

  @ApiProperty({
    example: "2025-05-29",
    description: "Date the delivery was received",
  })
  @Column({ type: "date" })
  delivered_date: string;

  @ApiProperty({
    example: "completed",
    description: "Status of the delivery",
  })
  @Column({ type: "enum", enum: ["pending", "in_transit", "completed"] })
  status: string;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.delivery, {onDelete:"CASCADE"})
  @JoinColumn({ name: "suppliersId" })
  suppliers: Suppliers;

  @OneToMany(() => Order, (order) => order.delivery)
  orders: Order[];
}
