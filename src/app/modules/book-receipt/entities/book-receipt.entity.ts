import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('book_receipts')
export class BookReceipt extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'book_id', type: 'integer', nullable: false })
  bookId: number;

  @Column({
    name: 'receipt_date',
    type: 'datetime',
    nullable: false,
  })
  reportTime: Date;


  @ManyToOne(() => Book, book => book.bookReceipts)
  @JoinColumn({ name: 'book_id' })
  book: Book; // Define the relationship with book

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}