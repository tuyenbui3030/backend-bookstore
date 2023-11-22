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
import { CreateBookDto, SearchBook } from './dto/book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../../vendors/guards/auth.guard';
import { Request, query } from 'express';
import { BaseController } from '../../../vendors/base/base.controller';

@ApiTags('Book')
@Controller('book')
export class BookController extends BaseController {
    constructor(private readonly bookService: BookService) {
        super();
    }


    @Post('importBook')
    async importBook(@Body() createBookDto: CreateBookDto[]) {
        console.log(createBookDto);
        return this.response(await this.bookService.importBook(createBookDto));
    }


    @Get('search')
    async searchBook(@Query() search: SearchBook) {
        return this.response(await this.bookService.searchBook(search));
    }

    @Get('detail')
    async detail(@Query() query) {
        return this.response(await this.bookService.detail(query));
    }


}
