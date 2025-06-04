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
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../common/guards/jwt-role.guard";
import { JwtActiveGuard } from "../common/guards/jwt-active.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@ApiTags("Authors")
@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "Create a new author",
  })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: "Get all authors",
  })
  findAll() {
    return this.authorsService.findAll();
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({
    summary: "Get a single author by ID",
  })
  findOne(@Param("id") id: string) {
    return this.authorsService.findOne(+id);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "Update an author by ID",
  })
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "Delete an author by ID",
  })
  remove(@Param("id") id: string) {
    return this.authorsService.remove(+id);
  }
}
