import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsModule } from './reviews/reviews.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { BookAuthorModule } from './book_author/book_author.module';
import { GenreModule } from './genre/genre.module';
import { WorkerModule } from './worker/worker.module';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { BookStoreModule } from './book_store/book_store.module';
import { Address } from "./address/entities/address.entity";
import { BookStore } from "./book_store/entities/book_store.entity";
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PaymentModule } from './payment/payment.module';
import { Order } from "./order/entities/order.entity";
import { Payment } from "./payment/entities/payment.entity";
import { Delivery } from "./delivery/entities/delivery.entity";
import { Suppliers } from "./suppliers/entities/supplier.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ReviewsModule,
    AuthorsModule,
    BooksModule,
    BookAuthorModule,
    GenreModule,
    WorkerModule,
    CustomerModule,
    AddressModule,
    BookStoreModule,
    OrderModule,
    DeliveryModule,
    SuppliersModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
