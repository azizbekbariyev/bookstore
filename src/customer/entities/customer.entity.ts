import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Or,
} from "typeorm";
import { Address } from "../../address/entities/address.entity";
import { Review } from "../../reviews/entities/review.entity";
import * as uuid from "uuid";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Customer {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the customer",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "John",
    description: "First name of the customer",
  })
  @Column()
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Last name of the customer",
  })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the customer",
  })
  @Column()
  email: string;

  @ApiPropertyOptional({
    example: "+998901234567",
    description: "Phone number of the customer",
  })
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional({
    example: "2025-05-29 12:00:00",
    description: "Registration date and time of the customer",
  })
  @Column({ type: "timestamp", nullable: true })
  registration_date?: Date;

  @ApiPropertyOptional({
    example: "2025-05-29 11:00:00",
    description: "Last login date and time of the customer",
  })
  @Column({ type: "timestamp", nullable: true })
  last_login?: Date;

  @ApiProperty({
    example: true,
    description: "Indicates if the customer account is active",
  })
  @Column()
  is_active: boolean;

  @ApiProperty({
    example: "$2b$10$...hashed_password...",
    description: "Hashed password of the customer",
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    example: "https://example.com/activate?token=123456789",
    description: "Activation link for customer account activation",
  })
  @Column({ default: uuid.v4() })
  activation_link: string;

  @ApiProperty({
    example: "$2b$10$...hashed_refresh_token...",
    description: "Hashed refresh token of the customer",
  })
  @Column({ nullable: true })
  hashed_refresh_token?: string;

  @ManyToOne(() => Address, (address) => address.customers, {onDelete:"CASCADE"})
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @OneToMany(() => Order, (order) => order.customer)
  @JoinColumn({ name: 'orderId' })
  orders: Order[];

  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];
}
