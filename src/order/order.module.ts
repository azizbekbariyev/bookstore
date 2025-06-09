import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BookStore } from '../book_store/entities/book_store.entity';
import { Book } from '../books/entities/book.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Delivery } from '../delivery/entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, BookStore, Book, Customer, Delivery])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
