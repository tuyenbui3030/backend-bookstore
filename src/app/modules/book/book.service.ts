import { Injectable } from '@nestjs/common';
import { BookInfo, CreateBookDto, UpdateBook } from './dto/book.dto';
import { BookRepository } from './book.repository';
import { Book } from './entities/book.entity';
import { ILike } from 'typeorm';
import { BaseException } from '../../../vendors/exceptions/base.exception';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository
  ) { }


  async importBook(createUserDto: CreateBookDto[]) {
    await this.bookRepository.save(createUserDto);
  }

  async searchBook(searchBook: BookInfo): Promise<Book[]> {
    const quantity = searchBook.quantity || Number.MAX_SAFE_INTEGER;
    const books = (await this.bookRepository.find({
      where: [
        { name: ILike(`%${searchBook.name}%`) }, // Tìm theo tên sách chứa chuỗi query
        { author: ILike(`%${searchBook.author}%`) }, // Tìm theo tác giả chứa chuỗi query
        { categoryId: searchBook.categoryId || 0 }, // Tìm theo ID thể loại (nếu query là một số)
      ],
    })).filter(item => item.quantity < quantity);
    return books;
  }

  async detail(query): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id: query.id,
      }
    });
    return book;
  }

  async updateBook(bookId: number, updatedBookData: Partial<Book>): Promise<Book> {
    const bookToUpdate = await this.bookRepository.findOne({
      where: {
        id: bookId
      }
    });

    if (!bookToUpdate) {
      // Xử lý trường hợp không tìm thấy sách
      throw new BaseException(
        'BOOK_NOT_EXISTS',
        'BOOK_NOT_EXISTS',
      );
    }

    // Cập nhật thông tin sách với dữ liệu mới
    const updatedBook = Object.assign(bookToUpdate, updatedBookData);
    return await this.bookRepository.save(updatedBook);
  }

  async deleteBook(bookId: number): Promise<void> {
    const bookToDelete = await this.bookRepository.findOne({
      where: {
        id: bookId
      }
    });

    if (!bookToDelete) {
      // Xử lý trường hợp không tìm thấy sách
      throw new BaseException(
        'BOOK_NOT_EXISTS',
        'BOOK_NOT_EXISTS',
      );
    }

    // Cập nhật thông tin sách với dữ liệu mới
    await this.bookRepository.remove(bookToDelete);
  }
}
