import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  /**
   * find user by username
   * @param username
   * @returns
   */
  async findByusername(username: string): Promise<User> {
    return await this.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * find user by token
   * @param refreshToken
   * @returns
   */
  async findUserByToken(refreshToken: string): Promise<User> {
    return await this.findOne({
      where: {
        refreshToken,
      },
    });
  }
}
