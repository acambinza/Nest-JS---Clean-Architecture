import { Inject, Injectable } from '@nestjs/common';
import { StartTaskDto } from '../dto/start-task.dto';
import { ITaskRepository } from '../task.repository';

@Injectable()
export class StartTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository,
  ) {}

  async execute(id: string, input: StartTaskDto) {
    const task = await this.taskRepo.findById(id);
    task.start(input.start_at);
    await this.taskRepo.update(task);
    return task;
  }
}
