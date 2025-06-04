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
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi manzil yaratish" })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha manzillarni olish" })
  findAll() {
    return this.addressService.findAll();
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta manzilni olish" })
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(+id);
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha manzilni yangilash" })
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha manzilni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.addressService.remove(+id);
  }
}
