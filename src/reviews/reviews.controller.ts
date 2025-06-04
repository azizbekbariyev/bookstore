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
import { ReviewsService } from "./reviews.service";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sharh qo‘shish" })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha sharhlarni ko‘rish" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha sharhni ko‘rish" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha sharhni yangilash" })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Roles("customer")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha sharhni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
