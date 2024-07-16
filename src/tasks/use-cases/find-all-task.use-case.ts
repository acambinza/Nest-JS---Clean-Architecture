import { Repository } from 'typeorm/repository/Repository';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  execute() {
    return this.taskRepo.find();
  }
}
