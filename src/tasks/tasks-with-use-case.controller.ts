import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { FindAllTaskUseCase } from './use-cases/find-all-task.use-case';
import { StartTaskUseCase } from './use-cases/start-task.use-case';
import { StartTaskDto } from './dto/start-task.dto';

@Controller('tasks')
export class TasksWithUseCaseController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly startTaskUseCase: StartTaskUseCase,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Get()
  findAll() {
    return this.findAllTaskUseCase.execute();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(id);
  // }

  @Post(':id/start')
  update(@Param('id') id: string, @Body() startTaskDto: StartTaskDto) {
    return this.startTaskUseCase.execute(id, startTaskDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(id);
  // }
}
