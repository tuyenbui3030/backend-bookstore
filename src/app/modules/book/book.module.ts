import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRepository } from './book.repository';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      template: {
        dir: path.join(__dirname, '../../../', 'mails'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    BookRepository,
    JwtService,
  ],
})
export class BookModule {}