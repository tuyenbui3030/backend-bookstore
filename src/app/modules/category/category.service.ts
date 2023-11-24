import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';
import { BaseException } from '../../../vendors/exceptions/base.exception';

@Injectable()
export class CategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }


    async createCategory(createUserDto: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {
                categoryName: createUserDto.categoryName,
            }
        })
        if (category) {
            throw new BaseException('CATEGORY_EXISTS', 'CATEGORY_EXISTS');
        }
        return await this.categoryRepository.save(createUserDto);
    }
}
