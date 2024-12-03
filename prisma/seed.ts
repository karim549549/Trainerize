// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const foodCategories = [
    'Italian',
    'Chinese',
    'Mexican',
    'Indian',
    'French',
    'Japanese',
    'Mediterranean',
    'Thai',
    'Spanish',
    'Greek',
  ];

  const categories = foodCategories.map((categoryName) => ({
    name: categoryName,
    description: faker.lorem.paragraph(),
  }));


  await prisma.category.createMany({
    data: categories,
  });

  console.log(`${foodCategories.length} categories seeded.`);

  const categoriesInDb = await prisma.category.findMany();
  const recipeCount = 50; 


  const recipes = Array.from({ length: recipeCount }, () => {
    const category = faker.helpers.arrayElement(categoriesInDb);
    const name = faker.food.dish();
    const description = faker.lorem.sentence(); 
    const instruction = faker.lorem.paragraph(); 
    const ingredients = faker.lorem.words(10);
    const servingPerGram = faker.number.int({ min: 50, max: 200 });
    const calories = faker.number.int({ min: 100, max: 800 });
    const totalFat = faker.number.int({ min: 0, max: 50 });
    const saturatedFat = faker.number.int({ min: 0, max: 20 });
    const totalCarbohydrate = faker.number.int({ min: 10, max: 100 });
    const sugar = faker.number.int({ min: 0, max: 30 });
    const fiber = faker.number.int({ min: 0, max: 10 });
    const protein = faker.number.int({ min: 1, max: 50 });
    const isNutsFree = faker.datatype.boolean();
    const isGlutenFree = faker.datatype.boolean();
    const isDairyFree = faker.datatype.boolean();
    const isEggFree = faker.datatype.boolean();
    const isSoyFree = faker.datatype.boolean();
    const isShellfishFree = faker.datatype.boolean();
    const isWheatFree = faker.datatype.boolean();
    const isPeanutFree = faker.datatype.boolean();
    const imageUrl = `https://source.unsplash.com/400x400/?food&sig=${uuidv4()}`;
    const peraperationTimePerMin = faker.number.int({ min: 10, max: 60 });

    return {
      name,
      description,
      instruction,
      ingrediants: ingredients,
      servingPerGram,
      calories,
      totalFat,
      saturatedFat,
      totalCarbohydrate,
      sugar,
      fiber,
      Protein: protein,
      isNutsFree,
      isGlutenFree,
      isDairyFree,
      isEggFree,
      isSoyFree,
      isShellfishFree,
      isWheatFree,
      isPeanutFree,
      imageUrl,
      peraperationTimePerMin,
      categoryId: category.id,
    };
  });

  await prisma.recipe.createMany({
    data: recipes,
  });

  console.log(`${recipeCount} recipes seeded.`);
  console.log('Seeding completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
