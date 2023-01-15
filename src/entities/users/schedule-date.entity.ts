import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateType } from '../enums/date-type.enum';
import { User } from './user.entity';

@Entity('scheduled-date', { schema: 'users' })
export class ScheduledDate {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200, nullable: false })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'date',
    nullable: true,
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: DateType,
    default: DateType.MEDIC,
  })
  type: DateType;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: User;
}
