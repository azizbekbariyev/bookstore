import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi sharh qo‘shish' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha sharhlarni ko‘rish' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha sharhni ko‘rish' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha sharhni yangilash' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha sharhni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}