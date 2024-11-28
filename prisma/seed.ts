import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const recipes = Array.from({ length: 10 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    ingredients: Array.from({ length: faker.number.int({ min: 2, max: 5 }) })
      .map(() => `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`)
      .join(', '),
    Allergies: Array.from({ length: faker.number.int({ min: 1, max: 3 }) })
      .map(() => faker.word.noun())
      .join(', '),
    instructions: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })).split('\n').join('\n'),
    calories: faker.number.int({ min: 100, max: 2000 }),
    image: faker.image.url(),
    dietType: faker.helpers.arrayElement(['Vegan', 'Vegetarian', 'Gluten-Free', 'Paleo', 'Keto']),
  }));

  await prisma.recipe.createMany({
    data: recipes,
  });

  console.log('Seeding completed!');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
