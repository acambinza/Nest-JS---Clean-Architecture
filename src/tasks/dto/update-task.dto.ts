import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../entities/task.entity';

class _UpdateTaskDto {
  name: string;
  description?: string;
  start_at?: Date | null;
  end_at?: Date | null;
  status?: TaskStatus;
}

export class UpdateTaskDto extends PartialType(_UpdateTaskDto) {}
