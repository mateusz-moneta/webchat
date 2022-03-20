import { IsEmail, Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @Length(2, 30, { message: 'The name must be at least 2 but not longer than 30 characters' })
  username: string;

  @Column({ type: String })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @Column({ type: String })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
