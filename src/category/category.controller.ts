import { Controller, Get, Param ,Query ,Response } from '@nestjs/common';
import { CategoryService } from './category.service';

import  { HttpStatus } from '@nestjs/common';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Query('pageSize') pageSize : number =10,
  @Query('page') page : number =1,
  @Query('recipePageSize') recipePageSize : number =10,
  @Query('recipePage') recipePage : number =1
  ,@Response() res) {
    const result = await this.categoryService.findAll(
      Number(pageSize),
      Number(page),
      Number(recipePageSize),
      Number(recipePage)
    );
    return result.isSuccess ? 
    res.status(HttpStatus.OK).json(result.data) 
    : 
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result.message);
  }

  @Get(':id')
  async findOne(@Param('id') id: number,
  @Query('recipePageSize') recipePageSize : number =10,
  @Query('recipePage') recipePage : number =1,
  @Response() res) {
    const result = await this.categoryService.findOne(
      Number(id),
      Number(recipePageSize),
      Number(recipePage)
    );
    return result.isSuccess ? 
    res.status(HttpStatus.OK).json(result.data) 
    : 
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result.message);
    
  }
}
