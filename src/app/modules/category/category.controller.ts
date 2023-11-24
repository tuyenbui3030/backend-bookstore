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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../../vendors/guards/auth.guard';
import { Request, query } from 'express';
import { BaseController } from '../../../vendors/base/base.controller';
import { Category } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController extends BaseController {
    constructor(private readonly categoryService: CategoryService) {
        super();
    }

    // @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Tạo mới thể loại' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                categoryName: {
                    type: 'string',
                    example: 'Kinh tế',
                    description: 'Tên thể loại',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Response API đăng nhập',
        schema: {
            type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                    example: 'Kinh tế',
                    description: 'Tên thể loại',
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post()
    async createCategory(@Body() category: Partial<CreateCategoryDto>) {
        return this.response(await this.categoryService.createCategory(category));
    }
}
