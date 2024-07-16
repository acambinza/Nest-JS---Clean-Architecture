import { Repository } from 'typeorm/repository/Repository';
import { Task, TaskStatus } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartTaskDto } from '../dto/start-task.dto';

@Injectable()
export class StartTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(id: string, input: StartTaskDto) {
    const task = await this.taskRepo.findOneByOrFail({ id: id });

    if (input.start_at) {
      if (task.status === TaskStatus.Active) {
        throw new Error('Cannot start activated task');
      }

      if (task.status === TaskStatus.Completed) {
        throw new Error('Cannot start completed task');
      }

      if (task.status === TaskStatus.Cancelled) {
        throw new Error('Cannot start cancelled task');
      }

      task.start_at = input.start_at;
      task.status = TaskStatus.Active;
    }

    return this.taskRepo.save(task);
  }
}
