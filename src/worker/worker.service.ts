import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) {}

  create(createWorkerDto: CreateWorkerDto) {
    const { hashed_password} = createWorkerDto
    createWorkerDto.hashed_password = bcrypt.hashSync(hashed_password, 10);
    return this.workerRepository.save(createWorkerDto);
  }

  findAll() {
    return this.workerRepository.find();
  }

  findOne(id: number) {
    return this.workerRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return this.workerRepository.update(id, updateWorkerDto);
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
