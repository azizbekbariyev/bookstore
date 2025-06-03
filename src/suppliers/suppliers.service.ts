import { Injectable } from '@nestjs/common';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSuppliersDto } from './dto/create-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suppliers } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor (
    @InjectRepository(Suppliers)
    private readonly supplierRepository: Repository<Suppliers>
  ) {}
  create(createSupplierDto: CreateSuppliersDto) {
    return this.supplierRepository.save(createSupplierDto);
  }

  findAll() {
    return this.supplierRepository.find();
  }

  findOne(id: number) {
    return this.supplierRepository.findOne({where:{id}});
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepository.update(id, updateSupplierDto);
  }

  remove(id: number) {
    return this.supplierRepository.delete(id);
  }
}
