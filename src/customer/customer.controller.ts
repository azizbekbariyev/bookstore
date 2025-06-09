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
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiBearerAuth()
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi mijoz yaratish" })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mijozlarni olish" })
  findAll() {
    return this.customerService.findAll();
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha mijozni olish" })
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha mijoz ma'lumotini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha mijozni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id/password")
  updatePassword(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.customerService.updatePassword(+id, updatePasswordDto);
  }
}
