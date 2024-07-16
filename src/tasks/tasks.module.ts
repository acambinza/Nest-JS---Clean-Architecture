import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksWithUseCaseController } from './tasks-with-use-case.controller';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { FindAllTaskUseCase } from './use-cases/find-all-task.use-case';
import { StartTaskUseCase } from './use-cases/start-task.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [
    // TasksController,
    TasksWithUseCaseController,
  ],
  providers: [
    TasksService,
    CreateTaskUseCase,
    FindAllTaskUseCase,
    StartTaskUseCase,
  ],
})
export class TasksModule {}
