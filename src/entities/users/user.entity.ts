import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { State } from '../enums/state.enum';
import { ScheduledDate } from './schedule-date.entity';

@Entity('user', { schema: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200, nullable: false })
  email: string;

  @Column('character varying', { length: 200, nullable: false })
  name: string;

  @Column('character varying', { length: 200, nullable: false })
  nuip: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State;

  @OneToMany(() => ScheduledDate, (userRol) => userRol.user)
  dates: ScheduledDate[];
}
