import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../task.repository';

@Injectable()
export class FindAllTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepo: ITaskRepository,
  ) {}

  execute() {
    return this.taskRepo.findlAll();
  }
}
