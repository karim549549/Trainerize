import { Injectable } from '@nestjs/common';
import { Result } from 'src/utils/result';
import { CategoryRepository } from './category.repository';
import  { CategoryResponse } from './dto/category.response';
import { PaginationMetaData } from '../utils/paginationMetaData';
import { CategoriesResponse } from './dto/allCategories.response';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(pageSize: number = 10, page: number = 1, recipePageSize: number = 10, 
    recipePage: number = 1): Promise<Result<CategoriesResponse>> {
    const categories = await this.categoryRepository.findAllCategories(pageSize, page , recipePageSize , recipePage);
    
    if (categories.categories.length == 0 || !categories){
      return new Result<CategoriesResponse>(false,null, 400,'No categories found');
    }
    const recipesPaginationMetaData= new PaginationMetaData(
      recipePage,
      recipePageSize,
      categories.totalCategories, 
      categories.totalCategoryPages);

    const CategoriesPaginationMetaData= new PaginationMetaData(
      page,
      pageSize,
      categories.totalRecipes, 
      categories.totalRecipePages);

    return new Result<CategoriesResponse>(true,
      new CategoriesResponse(
        recipesPaginationMetaData,
        CategoriesPaginationMetaData,
        categories.categories
      )
      , 200, 'Categories retrieved successfully');
  }
  async findOne(id: number, recipePageSize:number = 10, recipePage:number = 1):
  Promise<Result<CategoryResponse>> {
    const category = await this.categoryRepository.findCategoryById(
      id,
      recipePageSize,
      recipePage
    );
    if(!category) return new Result<CategoryResponse>(false,null, 400,'No category found');
    const recipesPaginationMetaData= new PaginationMetaData(
      recipePage,
      recipePageSize,
      category.totalRecipes, 
      category.totalRecipePages);
    
    return new Result<CategoryResponse>(true,
      new CategoryResponse(
        recipesPaginationMetaData,
        category.category
      )
      , 200, 'Category retrieved successfully')
  }
}
