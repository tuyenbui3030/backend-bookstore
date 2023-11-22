import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('inventory_reports')
export class InventoryReport extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'book_id', type: 'integer', nullable: false })
  bookId: number;

  @Column({
    name: 'report_time',
    type: 'datetime',
    nullable: false,
  })
  reportTime: Date;

  @Column({
    name: 'initial_debt',
    type: 'float',
    nullable: false,
    default: 0,
  })
  initialDebt: number;

  @Column({
    name: 'final_debt',
    type: 'float',
    nullable: false,
    default: 0,
  })
  finalDebt: number;

  @ManyToOne(() => Book, book => book.inventoryReports)
  @JoinColumn({ name: 'book_id' })
  book: Book; // Define the relationship with book

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
