import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaClient } from '@prisma/client';
import { CategoryModule } from './category/category.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [ PrismaClient, CategoryModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
