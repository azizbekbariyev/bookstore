import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: '9783161484100', description: 'Book ISBN number' })
  isbn: number;

  @ApiProperty({ example: 'The Great Gatsby', description: 'Title of the book' })
  title: string;

  @ApiProperty({ example: 19.99, description: 'Price of the book' })
  price: number;

  @ApiProperty({ example: 100, description: 'Number of books in stock', required: false })
  stock_quantity?: number;

  @ApiProperty({ example: '1925-04-10', description: 'Publication date of the book', required: false })
  publication_date?: string;

  @ApiProperty({ example: 'fiction', description: 'Genre ID or code', required: false })
  genre_id?: string;

  @ApiProperty({ example: 180, description: 'Total pages in the book', required: false })
  pages?: number;

  @ApiProperty({ example: 'English', description: 'Language of the book', required: false })
  language?: string;
}