import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity'; // Import Category entity
import { BookReceipt } from '../../book-receipt/entities/book-receipt.entity';
import { InventoryReport } from '../../inventory-report/entities/inventory-report.entity';

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;

  @Column({ name: 'category_id', type: 'integer', nullable: false })
  categoryId: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  quantity: number;

  @ManyToOne(() => Category, category => category.books)
  @JoinColumn({ name: 'category_id' })
  category: Category; // Define the relationship with category

  @OneToMany(() => BookReceipt, bookReceipt => bookReceipt.book)
  bookReceipts: BookReceipt[]; // Define the relationship with book receipts

  @OneToMany(() => InventoryReport, inventoryReport => inventoryReport.book)
  inventoryReports: InventoryReport[]; // Define the relationship with inventory reports

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}