import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enums/state.enum';
import { Answer } from './answer.entity';

@Entity('ask', { schema: 'dialog' })
export class Ask {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.ACTIVE,
  })
  state: State;

  @OneToMany(() => Answer, (answer) => answer.ask)
  answers: Answer[];
}
