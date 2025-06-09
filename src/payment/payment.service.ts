import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { Order } from "../order/entities/order.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });
    if (order) {
      return this.paymentRepository.save(createPaymentDto);
    }
    throw new Error("Order not found");
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: updatePaymentDto.orderId },
    })
    if(order) {
      return this.paymentRepository.update(id, updatePaymentDto);
    }
    throw new Error("Order not found")
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
