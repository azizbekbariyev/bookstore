import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {}

  create(createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryRepository.save(createDeliveryDto);
  }

  findAll() {
    return this.deliveryRepository.find();
  }

  findOne(id: number) {
    return this.deliveryRepository.findOne({ where: { id } });
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryRepository.update(id, updateDeliveryDto);
  }

  remove(id: number) {
    return this.deliveryRepository.delete(id);
  }
}
