import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    Unique,
  } from 'typeorm';
  
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
  
    @Column({ type: 'integer', nullable: false, default:0 })
    quantity: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  