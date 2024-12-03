import { PaginationMetaData } from "src/utils/paginationMetaData"
import  { Category } from "../entities/category.entity"

export  class CategoriesResponse{
  recpiePaginationMetaData:PaginationMetaData
  categoryPaginationMetaData:PaginationMetaData
  categories:Category[]

  constructor(recpiePaginationMetaData:PaginationMetaData,categoryPaginationMetaData:PaginationMetaData,categories:Category[] ){
    this.recpiePaginationMetaData=recpiePaginationMetaData
    this.categoryPaginationMetaData=categoryPaginationMetaData
    this.categories=categories
  }
}