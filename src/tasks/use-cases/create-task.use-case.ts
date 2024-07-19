import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../task.repository';

@Injectable()
export class CreateTaskUseCase {
  @Inject('ITaskRepository')
  private readonly taskRepo: ITaskRepository;

  async execute(input: CreateTaskDto) {
    const task = new Task(input);
    input.start_at ? (task.status = TaskStatus.Active) : TaskStatus.Pending;
    await this.taskRepo.create(task);
    return task;
  }
}
