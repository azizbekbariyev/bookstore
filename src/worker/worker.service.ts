import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';
import { BookStore } from '../book_store/entities/book_store.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    @InjectRepository(BookStore)
    private readonly bookStoreRepository: Repository<BookStore>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const { hashed_password} = createWorkerDto
    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: createWorkerDto.bookStoreId },
    })
    if (bookStore) {
      createWorkerDto.hashed_password = bcrypt.hashSync(hashed_password, 10);
      return this.workerRepository.save(createWorkerDto);
    }
    throw new Error("BookStore not found");
  }

  findAll() {
    return this.workerRepository.find();
  }

  findOne(id: number) {
    return this.workerRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: updateWorkerDto.bookStoreId },
    })
    if (bookStore) {
      return this.workerRepository.update(id, updateWorkerDto);
    }
    throw new Error("BookStore not found");
  }

  remove(id: number) {
    return this.workerRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.workerRepository.findOne({
      where: { email },
    });
  }

  findByLink(activation_link: string) {
    return this.workerRepository.findOne({ where: { activation_link } });
  }
}
