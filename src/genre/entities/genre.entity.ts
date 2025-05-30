import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";

@Entity({ name: "genre" })
export class Genre {
  @ApiProperty({ example: 1, description: "Unique identifier for the genre" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Fiction", description: "Name of the genre" })
  @Column({ type: "varchar", nullable: false })
  genre: string;

  @ApiProperty({
    example: "A category of literature.",
    description: "Description of the genre",
    required: false,
  })
  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
}
