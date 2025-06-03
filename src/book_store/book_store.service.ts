import { Injectable } from '@nestjs/common';
import { CreateBookStoreDto } from './dto/create-book_store.dto';
import { UpdateBookStoreDto } from './dto/update-book_store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStore } from './entities/book_store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookStore)
    private readonly bookStoreRepository: Repository<BookStore>,
  ) {}

  create(createBookStoreDto: CreateBookStoreDto) {
    return this.bookStoreRepository.save(createBookStoreDto);
  }

  findAll() {
    return this.bookStoreRepository.find(
      {
        relations: ['address'],
      },
    );
  }

  findOne(id: number) {
    return  this.bookStoreRepository.findOne({where: {id}});
  }

  update(id: number, updateBookStoreDto: UpdateBookStoreDto) {
    return this.bookStoreRepository.update(id, updateBookStoreDto);
  }

  remove(id: number) {
    return this.bookStoreRepository.delete(id);
  }
}
