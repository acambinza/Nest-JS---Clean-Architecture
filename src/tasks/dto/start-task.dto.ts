import { PartialType } from '@nestjs/mapped-types';

class _UpdateTaskDto {
  start_at: Date;
}

export class StartTaskDto extends PartialType(_UpdateTaskDto) {}
