import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { BookStore } from "../../book_store/entities/book_store.entity";
import * as uuid from "uuid";

@Entity()
export class Worker {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the worker",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "John",
    description: "First name of the worker",
  })
  @Column()
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Last name of the worker",
  })
  @Column()
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the worker",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Hashed password of the worker",
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    example: "employee",
    description: "Role of the worker",
  })
  @Column({
    type: "enum",
    enum: ["admin", "employee", "manager"],
    default: "employee",
  })
  role: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Phone number of the worker",
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: "2023-01-15",
    description: "Hire date of the worker",
  })
  @Column()
  hire_date: string;

  @ApiProperty({
    example: true,
    description: "Whether the worker is active",
  })
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({
    example: "hashedrefreshtoken123",
    description: "Hashed refresh token of the worker",
  })
  @Column({ nullable: true })
  hashed_refresh_token?: string;

  @ApiProperty({
    example: 1,
    description: "ID of the book store associated with the worker",
  })
  @Column({ nullable: true })
  book_store_id: number;

  @ApiProperty({
    example: "https://example.com/activate/123",
    description: "Activation link of the worker",
  })
  @Column({ default: uuid.v4() })
  activation_link: string;

  @ManyToOne(() => BookStore, (bookStore) => bookStore.workers)
  @JoinColumn({ name: "book_store_id" })
  bookStore: BookStore;
}
