import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../task.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskTypeORMRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(task: Task): Promise<void> {
    await this.taskRepo.save(task);
  }
  async update(task: Task): Promise<void> {
    await this.taskRepo.update(task.id, task);
  }
  async findlAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }
  async findById(id: string): Promise<Task> {
    return this.taskRepo.findOneOrFail({ where: { id } });
  }
}
