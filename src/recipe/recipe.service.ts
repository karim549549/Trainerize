import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { PrismaService } from 'prisma/PrismaService/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.prisma.recipe.create({
      data: createRecipeDto, 
    });
  }

  async findAll(pageNumber: number = 1, pageSize : number =  10): Promise<Partial<Recipe>[]> {
    return await this.prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        Allergies: true,
        instructions: true,
        calories: true,
        dietType: true,
      },
      skip: (pageNumber - 1) * pageSize, 
      take: pageSize, 
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe; 
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return this.prisma.recipe.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  async remove(id: number): Promise<Recipe> {
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
