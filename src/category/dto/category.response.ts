import { PaginationMetaData } from "src/utils/paginationMetaData";
import { Category } from "../entities/category.entity";

export class CategoryResponse{
  RecipesPaginationMetaData: PaginationMetaData;
  Categories: Category[];

  constructor(RecipesPaginationMetaData: PaginationMetaData, Categories: Category[]) {
    this.RecipesPaginationMetaData = RecipesPaginationMetaData;
    this.Categories = Categories;
  }
}
