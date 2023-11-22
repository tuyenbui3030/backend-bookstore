import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity'; // Import Book entity

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({
    name: 'category_name',
    type: 'nvarchar',
    length: 255,
    nullable: false,
  })
  categoryName: string;

  @OneToMany(() => Book, book => book.category)
  books: Book[]; // Define the relationship with books

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
