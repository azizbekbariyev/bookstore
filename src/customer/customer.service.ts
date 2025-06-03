import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.hashed_password = bcrypt.hashSync(createCustomerDto.hashed_password, 10);
    return this.customerRepository.save(createCustomerDto);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.customerRepository.delete(id);
  }

  findByLink(activation_link: string) {
    return this.customerRepository.findOne({
      where: { activation_link }
    });
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({
      where: { email }
    });
  }
}
