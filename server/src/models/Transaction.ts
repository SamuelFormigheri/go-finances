import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Category from './Category';
import User from './User';

@Entity('db_transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('numeric')
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(()=> Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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

export default Transaction;
