import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAllCategories(
    pageSize: number = 10, 
    page: number = 1, 
    recipePageSize: number = 10, 
    recipePage: number = 1
  ): Promise<any> {
    const skip = (page - 1) * pageSize;  
    const recipeSkip = (recipePage - 1) * recipePageSize; 

    const categories = await this.prisma.category.findMany({
      skip,
      take: pageSize,
      include: {
        recipes: {
          skip: recipeSkip,
          take: recipePageSize,
          select: {
            id: true,
            name: true,
            imageUrl: true,
            description: true,
            isNutsFree: true,
            isGlutenFree: true,
            isDairyFree: true,
            isEggFree: true,
            isSoyFree: true,
            isShellfishFree: true,
            isWheatFree: true,
            isPeanutFree: true,
          },
        },
      },
    });

    const totalCategories = await this.prisma.category.count();
    const totalCategoryPages = Math.ceil(totalCategories / pageSize);

    const categoryWithRecipeCounts = await Promise.all(
      categories.map(async (category) => {
        const totalRecipes = await this.prisma.recipe.count({
          where: { categoryId: category.id },
        });
        const totalRecipePages = Math.ceil(totalRecipes / recipePageSize);

        return {
          ...category,
          totalRecipes,
          totalRecipePages,
          totalCategories,
          totalCategoryPages
        };
      })
    );

    return {
      categories: categoryWithRecipeCounts,
      totalCategories,
      totalCategoryPages,
    };
  }

  async findCategoryById(id: number, recipePage: number = 1, recipePageSize: number = 10): Promise<any> {
    const recipeSkip = (recipePage - 1) * recipePageSize;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        recipes: {
          skip: recipeSkip,
          take: recipePageSize,
          select: {
            id: true,
            name: true,
            imageUrl: true,
            description: true,
            isNutsFree: true,
            isGlutenFree: true,
            isDairyFree: true,
            isEggFree: true,
            isSoyFree: true,
            isShellfishFree: true,
            isWheatFree: true,
            isPeanutFree: true,
          },
        },
      },
    });

    if (!category) return null;

    const totalRecipes = await this.prisma.recipe.count({
      where: { categoryId: id },
    });

    const totalRecipePages = Math.ceil(totalRecipes / recipePageSize);

    return {
      category,
      totalRecipes,
      totalRecipePages
    };
  }
}
