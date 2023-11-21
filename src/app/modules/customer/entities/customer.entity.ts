import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
