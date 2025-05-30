import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Fiction', description: 'Name of the genre' })
  name: string;

  @ApiProperty({
    example: 'Fiction is any narrative that is derived from the imagination.',
    description: 'Short description of the genre',
    required: false,
  })
  description?: string;
}