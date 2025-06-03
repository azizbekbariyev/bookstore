import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi to‘lov maʼlumotini yaratish' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha to‘lovlarni ko‘rish' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lov maʼlumotini olish' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lov maʼlumotini yangilash' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lovni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
