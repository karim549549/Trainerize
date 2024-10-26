import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaClient) {}

    async getAllCategories(pageNumber = 1, pageSize = 10) {
        const skip = (pageNumber - 1) * pageSize;
        return await this.prisma.category.findMany({
            skip,
            take: pageSize,
        });;
    }
    async getCategoryById(id: number) {
        return await this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }
    
    async createCategory(name: string) {
        return await this.prisma.category.create({
            data: {
                name
            }
        });
    }

    async updateCategory(id: number, name: string) {    
        return await this.prisma.category.update({
            where: {
                id
            },
            data: {
                name
            }
        });
    }

    async deleteCategory(id: number) {
        return await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
    
}
