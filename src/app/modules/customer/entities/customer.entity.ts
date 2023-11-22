import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Debt } from '../../debt/entities/debts.entity';
import { Receipt } from '../../receipt/entities/receipt.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  customerId: number;

  @Column({ type: 'text', name: 'address' })
  address: string;

  @Column({ type: 'text', name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'text', name: 'email' })
  email: string;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @OneToMany(() => Debt, debt => debt.customer)
  debts: Debt[]; // Define the relationship with debts

  @OneToMany(() => Receipt, receipt => receipt.customer)
  receipts: Receipt[]; // Define the relationship with debts

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
