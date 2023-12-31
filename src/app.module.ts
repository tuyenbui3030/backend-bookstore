import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Logger } from './common/logger/logger';
import dbConfig from './configs/db/mySql';
import { BaseException } from './vendors/exceptions/base.exception';
import { BookModule } from './app/modules/book/book.module';
import { CategoryModule } from './app/modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    UserModule,
    BookModule,
    CategoryModule,
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  async onModuleInit() {
    await this.init();
  }
  async init() {
    process.on('unhandledRejection', (reason) => {
      throw new BaseException(
        'unhandledRejection',
        'Unhandled Rejection',
        reason,
      );
    });
    new Logger().log(`${AppModule.name} init`);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
