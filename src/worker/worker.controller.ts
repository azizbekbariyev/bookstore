import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/jwt-role.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { JwtSelfGuard } from '../common/guards/jwt-self.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Workers')
@ApiBearerAuth()
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  // @Roles('superadmin') 
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi ishchini qo‘shish' })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Roles('superadmin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha ishchilarni ko‘rish' })
  findAll() {
    return this.workerService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini topish' })
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini yangilash' })
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(+id, updateWorkerDto);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.workerService.updatePassword(+id, updatePasswordDto);
  }
}
