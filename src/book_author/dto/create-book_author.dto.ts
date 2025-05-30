import { ApiProperty } from '@nestjs/swagger';

export class CreateBookAuthorDto {
  @ApiProperty({ description: 'ID of the book' })
  bookId: number;

  @ApiProperty({ description: 'ID of the author' })
  authorId: number;
}
