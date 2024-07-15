import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum TaskStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  start_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  end_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: TaskStatus = TaskStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      start_at?: Date | null;
      end_at?: Date | null;
      status: TaskStatus;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID().toString();
  }
}
