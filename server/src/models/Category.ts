import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn  } from 'typeorm';

import User from './User';

@Entity('db_categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  title: string;

  @Column()
  user_id: string;

  @ManyToOne(()=> User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
