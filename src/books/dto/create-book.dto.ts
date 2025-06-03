import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  IsDateString,
  IsInt,
  Min,
} from "class-validator";

export class CreateBookDto {
  @ApiProperty({ example: "9783161484100", description: "Book ISBN number" })
  @IsNumber()
  isbn: number;

  @ApiProperty({
    example: "The Great Gatsby",
    description: "Title of the book",
  })
  @IsString()
  title: string;

  @ApiProperty({ example: 19.99, description: "Price of the book" })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 100,
    description: "Number of books in stock",
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock_quantity?: number;

  @ApiProperty({
    example: "1925-04-10",
    description: "Publication date of the book",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publication_date?: string;

  @ApiProperty({
    example: "fiction",
    description: "Genre ID or code",
    required: false,
  })
  @IsOptional()
  @IsString()
  genre_id?: string;

  @ApiProperty({
    example: 180,
    description: "Total pages in the book",
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  pages?: number;

  @ApiProperty({
    example: "English",
    description: "Language of the book",
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;
}
