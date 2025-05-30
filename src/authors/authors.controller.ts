import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new author',
  })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all authors',
  })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single author by ID',
  })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an author by ID',
  })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an author by ID',
  })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
