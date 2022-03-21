import {
  BaseEntity, Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Conversation)
  conversation: Conversation;

  @ManyToOne(type => User)
  author: User;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  constructor(partial: Partial<Message>) {
    super();
    Object.assign(this, partial);
  }
}
