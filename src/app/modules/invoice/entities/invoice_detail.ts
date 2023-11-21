import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity'; // Import Invoice entity if exists
import { Book } from '../../book/entities/book.entity'; // Import Book entity if exists

@Entity('invoice_details')
export class InvoiceDetails extends BaseEntity {
  @Column({ type: 'double', name: 'unit_price' })
  unitPrice: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'invoice_id' })
  invoiceId: number;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice; // Assuming there's an Invoice entity

  @Column({ name: 'book_id' })
  bookId: number;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book; // Assuming there's a Book entity

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ type: 'double', name: 'total_amount' })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
