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
import { BookAuthorService } from "./book_author.service";
import { CreateBookAuthorDto } from "./dto/create-book_author.dto";
import { UpdateBookAuthorDto } from "./dto/update-book_author.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiBearerAuth()
@Controller("book-author")
export class BookAuthorController {
  constructor(private readonly bookAuthorService: BookAuthorService) {}

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi book-author bog‘lanishini yaratish" })
  create(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    return this.bookAuthorService.create(createBookAuthorDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha book-author bog‘lanishlarini olish" })
  findAll() {
    return this.bookAuthorService.findAll();
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha book-author bog‘lanishini olish" })
  findOne(@Param("id") id: string) {
    return this.bookAuthorService.findOne(+id);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha book-author bog‘lanishini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateBookAuthorDto: UpdateBookAuthorDto
  ) {
    return this.bookAuthorService.update(+id, updateBookAuthorDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha book-author bog‘lanishini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.bookAuthorService.remove(+id);
  }
}
