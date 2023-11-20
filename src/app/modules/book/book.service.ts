import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_ERRORS } from '../../../configs/constants/error-code';
import { AccountType } from '../../../configs/enum/account';
import { CreateBookDto, SearchBook } from './dto/book.dto';
import { BookRepository } from './book.repository';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { SALT_ROUNDS } from '../../../configs/constants/auth';
import { Book } from './entities/book.entity';
import { BaseException } from '../../../vendors/exceptions/base.exception';
import { generateOTP } from '../../../app/utils/genarate-otp';
import { OtpType } from '../../../configs/enum/otp';
import { MailerService } from '@nestjs-modules/mailer';
import { EmployeeRole } from '../../../configs/enum/employee-role';
import { ILike, Like } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository
  ) {}


  async importBook(createUserDto: CreateBookDto[]) {
    await this.bookRepository.save(createUserDto);
  }

  async searchBook(searchBook: SearchBook): Promise<Book[]> {
    const books = await this.bookRepository.find({
        where: [
          { name: ILike(`%${searchBook.name}%`) }, // Tìm theo tên sách chứa chuỗi query
          { author: ILike(`%${searchBook.author}%`) }, // Tìm theo tác giả chứa chuỗi query
          { categoryId: searchBook.categoryId || 0 }, // Tìm theo ID thể loại (nếu query là một số)
        ],
      });
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
}
