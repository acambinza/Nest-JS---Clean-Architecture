import { Repository } from 'typeorm/repository/Repository';
import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  execute(input: CreateTaskDto) {
    const task = new Task(input);
    input.start_at ? (task.status = TaskStatus.Active) : TaskStatus.Pending;
    return this.taskRepo.save(task);
  }
}
