import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { BookStore } from "../../book_store/entities/book_store.entity";
import { Customer } from "../../customer/entities/customer.entity";

@Entity()
export class Address {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the address",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Tashkent",
    description: "Name of the city",
  })
  @Column()
  city: string;

  @ApiProperty({
    example: "Tashkent Region",
    description: "Name of the state or region",
  })
  @Column()
  state: string;

  @ApiPropertyOptional({
    example: "Hospital entrance",
    description: "Specific target or landmark near the address",
  })
  @Column({ nullable: true })
  target?: string;

  @ApiPropertyOptional({
    example: "Amir Temur street",
    description: "Name of the street",
  })
  @Column({ nullable: true })
  street?: string;

  @ApiPropertyOptional({
    example: "12B",
    description: "House or building number",
  })
  @Column({ nullable: true })
  number?: string;

  @OneToMany(() => BookStore, (bookStore) => bookStore.address)
  bookStores: BookStore[];

  @OneToMany(() => Customer, (customer) => customer.address)
  customers: Customer[];
}
