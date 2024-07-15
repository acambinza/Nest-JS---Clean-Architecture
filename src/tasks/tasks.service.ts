import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const task = new Task(createTaskDto);

    createTaskDto.start_at
      ? (task.status = TaskStatus.Active)
      : TaskStatus.Pending;

    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find();
  }

  findOne(id: string) {
    return this.taskRepo.findOneByOrFail({
      id: id,
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOneByOrFail({ id: id });

    task.name && (task.name = updateTaskDto.name);
    task.description && (task.description = updateTaskDto.description);

    if (updateTaskDto.start_at) {
      if (updateTaskDto.status === TaskStatus.Active) {
        throw new Error('Cannot start activated task');
      }

      if (updateTaskDto.status === TaskStatus.Completed) {
        throw new Error('Cannot start completed task');
      }

      if (updateTaskDto.status === TaskStatus.Cancelled) {
        throw new Error('Cannot start cancelled task');
      }

      task.start_at = updateTaskDto.start_at;
      task.status = TaskStatus.Active;
    }

    if (updateTaskDto.end_at) {
      if (updateTaskDto.status === TaskStatus.Completed) {
        throw new Error('Cannot start completed task');
      }

      if (updateTaskDto.status === TaskStatus.Cancelled) {
        throw new Error('Cannot start cancelled task');
      }

      if (updateTaskDto.end_at < task.start_at) {
        throw new Error('Data de fim deve ser maior que a data de inicio');
      }

      task.end_at = updateTaskDto.end_at;
      task.status = TaskStatus.Completed;
    }

    return this.taskRepo.save(task);
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
