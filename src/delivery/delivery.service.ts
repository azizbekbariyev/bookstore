import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { Suppliers } from '../suppliers/entities/supplier.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Suppliers)
    private readonly supplierRepository: Repository<Suppliers>
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const supplier = await this.supplierRepository.findOne({
      where: { id: createDeliveryDto.suppliersId },
    })
    if(supplier) {
      return this.deliveryRepository.save(createDeliveryDto);
    }
    throw new Error("Supplier not found");
  }

  findAll() {
    return this.deliveryRepository.find();
  }

  findOne(id: number) {
    return this.deliveryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const supplier = await this.supplierRepository.findOne({
      where: { id: updateDeliveryDto.suppliersId },
    })
    if(supplier) {
      return this.deliveryRepository.update(id, updateDeliveryDto);
    }
    throw new Error("Supplier not found");
  }

  remove(id: number) {
    return this.deliveryRepository.delete(id);
  }
}
