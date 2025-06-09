import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.hashed_password = bcrypt.hashSync(createCustomerDto.hashed_password, 10);
    const address =  await this.addressRepository.findOne({
      where: { id: createCustomerDto.addressId }
    })
    if(address) {
      return this.customerRepository.save(createCustomerDto);
    }
    throw new Error("Address not found");
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const address = await this.addressRepository.findOne({
      where: { id: updateCustomerDto.addressId }
    })
    if(address) {
      updateCustomerDto.hashed_password = bcrypt.hashSync(updateCustomerDto.hashed_password ?? "", 10);
      return this.customerRepository.update(id, updateCustomerDto);
    }
    throw new Error("Address not found");
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
