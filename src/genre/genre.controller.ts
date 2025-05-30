import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a genre by ID' })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}