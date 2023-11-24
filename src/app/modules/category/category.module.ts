import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
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
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    JwtService,
  ],
})
export class CategoryModule {}