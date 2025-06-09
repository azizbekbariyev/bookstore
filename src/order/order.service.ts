import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { BookStore } from '../book_store/entities/book_store.entity';
import { Book } from '../books/entities/book.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Delivery } from '../delivery/entities/delivery.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(BookStore)
    private bookStoreRepository: Repository<BookStore>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: createOrderDto.bookStoreId },
    })
    const book = await this.bookRepository.findOne({
      where: { id: createOrderDto.bookId },
    })
    const customer = await this.customerRepository.findOne({
      where: { id: createOrderDto.customerId },
    })
    const delivery = await this.deliveryRepository.findOne({
      where: { id: createOrderDto.deliveryId },
    })
    if(bookStore && book && customer && delivery) {
      return this.orderRepository.save(createOrderDto);
    }
    throw new Error("BookStore, Book, Customer or Delivery not found");
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({where:{id}});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: updateOrderDto.bookStoreId },
    })
    const book = await this.bookRepository.findOne({
      where: { id: updateOrderDto.bookId },
    })
    const customer = await this.customerRepository.findOne({
      where: { id: updateOrderDto.customerId },
    })
    const delivery = await this.deliveryRepository.findOne({
      where: { id: updateOrderDto.deliveryId },
    })
    if(bookStore && book && customer && delivery) {
      return this.orderRepository.update(id, updateOrderDto); 
    }
    throw new Error("BookStore, Book, Customer or Delivery not found");
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
