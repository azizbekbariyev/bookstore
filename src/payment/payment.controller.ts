import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi to‘lov maʼlumotini yaratish" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Roles("admin" , "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha to‘lovlarni ko‘rish" })
  findAll() {
    return this.paymentService.findAll();
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lov maʼlumotini olish" })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lov maʼlumotini yangilash" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
