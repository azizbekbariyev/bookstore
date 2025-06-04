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
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi kitob yaratish" })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles("admin", "customer", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha kitoblarni olish" })
  findAll() {
    return this.booksService.findAll();
  }

  @Roles("admin", "customer", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha kitobni olish" })
  findOne(@Param("id") id: string) {
    return this.booksService.findOne(+id);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha kitob ma'lumotini yangilash" })
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha kitobni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }
}
