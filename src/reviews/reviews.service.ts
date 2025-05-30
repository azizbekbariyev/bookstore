import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto);
  }

  findAll() {
    return this.reviewRepository.find({
      relations: ['customer', 'book'],
    });
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { id },
      relations: ['customer', 'book'],
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update(id, updateReviewDto);
  }

  remove(id: number) {
    return this.reviewRepository.delete(id);
  }
}
