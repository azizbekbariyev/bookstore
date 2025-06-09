import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const book = await this.bookRepository.findOne({
      where: { id: createReviewDto.bookId },
    }) 
    const customer = await this.customerRepository.findOne({
      where: { id: createReviewDto.customerId },
    })
    if(book && customer) {
      return this.reviewRepository.save(createReviewDto);
    }
    console.log(book, customer);
    throw new Error("Book, Customer not found");
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

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const book = await this.bookRepository.findOne({
      where: { id: updateReviewDto.bookId },
    })
    const customer = await this.customerRepository.findOne({
      where: { id: updateReviewDto.customerId },
    })
    if(book && customer) {
      return this.reviewRepository.update(id, updateReviewDto);
    }
  }

  remove(id: number) {
    return this.reviewRepository.delete(id);
  }
}
