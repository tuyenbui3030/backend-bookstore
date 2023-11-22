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
import { Customer } from '../../customer/entities/customer.entity';
  
  @Entity('debts')
  export class Debt extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;

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

    @ManyToOne(() => Customer, customer => customer.debts)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer; // Define the relationship with customer
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }