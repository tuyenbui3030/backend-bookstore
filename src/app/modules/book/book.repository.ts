import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource.manager);
  }

//   /**
//    * find user by username
//    * @param username
//    * @returns
//    */
//   async findByusername(username: string): Promise<User> {
//     return await this.findOne({
//       where: {
//         username,
//       },
//     });
//   }

}
