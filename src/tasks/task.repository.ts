import { Task } from './entities/task.entity';

export interface ITaskRepository {
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  findlAll(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
}
