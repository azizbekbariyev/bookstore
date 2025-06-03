import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Workers')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi ishchini qo‘shish' })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha ishchilarni ko‘rish' })
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini topish' })
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini yangilash' })
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha ishchini o‘chirish' })
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }
}
