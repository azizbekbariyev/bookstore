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
import { DeliveryService } from "./delivery.service";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { ApiOperation } from "@nestjs/swagger";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Roles("admin", "superadmin", "customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi yetkazib berish maʼlumotini yaratish" })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha yetkazib berish maʼlumotlarini olish" })
  findAll() {
    return this.deliveryService.findAll();
  }

  @Roles("admin", "superadmin", "customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha yetkazib berish maʼlumotini olish" })
  findOne(@Param("id") id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Roles("admin", "superadmin", "customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "ID bo‘yicha yetkazib berish maʼlumotini yangilash",
  })
  update(
    @Param("id") id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Roles("admin", "superadmin", "customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "ID bo‘yicha yetkazib berish maʼlumotini o‘chirish",
  })
  remove(@Param("id") id: string) {
    return this.deliveryService.remove(+id);
  }
}
