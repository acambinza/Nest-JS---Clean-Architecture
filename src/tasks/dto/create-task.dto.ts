import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  name: string;
  description: string;
  start_at: Date | null;
  end_at: Date | null;
  status: TaskStatus;
}
