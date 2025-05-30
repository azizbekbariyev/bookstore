import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookAuthor } from "../../book_author/entities/book_author.entity";

@Entity({ name: "authors" })
export class Author {
  @ApiProperty({ example: 1, description: "Unique identifier for the author" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "John", description: "Author's first name" })
  @Column({ type: "varchar", nullable: false })
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Author's last name" })
  @Column({ type: "varchar", nullable: false })
  last_name: string;

  @ApiProperty({
    example: "Famous writer of thrillers.",
    description: "Author's biography",
    required: false,
  })
  @Column({ type: "text", nullable: true })
  biography?: string;

  @ApiProperty({
    example: "1975-10-01",
    description: "Author's birth date",
    required: false,
  })
  @Column({ type: "date", nullable: true })
  birth_date?: Date;

  @ApiProperty({
    example: "British",
    description: "Author's nationality",
    required: false,
  })
  @Column({ type: "varchar", nullable: true })
  nationality?: string;

  @ApiProperty({
    example: "2025-05-28T13:02:00+05:00",
    description: "Date and time when the author record was created",
    required: false,
  })
  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at?: Date;

  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.author)
  bookAuthors: BookAuthor[];
}
