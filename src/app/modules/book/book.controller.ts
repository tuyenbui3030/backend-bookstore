import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, BookInfo, UpdateBook } from './dto/book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../../vendors/guards/auth.guard';
import { Request, query } from 'express';
import { BaseController } from '../../../vendors/base/base.controller';
import { Book } from './entities/book.entity';

@ApiTags('Book')
@Controller('book')
export class BookController extends BaseController {
    constructor(private readonly bookService: BookService) {
        super();
    }

    @UseGuards(UserGuard)
    @Post('importBook')
    async importBook(@Body() createBookDto: CreateBookDto[]) {
        console.log(createBookDto);
        return this.response(await this.bookService.importBook(createBookDto));
    }

    @Get('search')
    async searchBook(@Query() search: BookInfo) {
        return this.response(await this.bookService.searchBook(search));
    }

    @UseGuards(UserGuard)
    @Get('detail')
    async detail(@Query() query) {
        return this.response(await this.bookService.detail(query));
    }

    @UseGuards(UserGuard)
    @Patch(':id')
    async updateBook(@Param('id') id: string, @Body() updatedBookData: Partial<Book>) {
        const bookId = parseInt(id, 10);
        const updatedBook = await this.bookService.updateBook(bookId, updatedBookData);
        return this.response(updatedBook);
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        const bookId = parseInt(id, 10);
        const deleteBook = await this.bookService.deleteBook(bookId);
        return this.response(bookId);
    }


}
