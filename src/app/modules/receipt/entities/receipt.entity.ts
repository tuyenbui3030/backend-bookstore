// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity'; // Import Customer entity if exists

@Entity('receipts')
export class Receipt extends BaseEntity {
  @PrimaryGeneratedColumn()
  receiptId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer; // Assuming there's a Customer entity

  @Column({ type: 'date', name: 'receipt_date' })
  receiptDate: Date;

  @Column({ type: 'double', name: 'received_amount' })
  receivedAmount: number;
}
