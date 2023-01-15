import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ask } from './ask.entity';

@Entity('answer', { schema: 'dialog' })
export class Answer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200, nullable: false })
  text: string;

  @ManyToOne(() => Ask, (ask) => ask.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ask' })
  ask: Ask;
}
