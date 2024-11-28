export class Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  Allergies: string;
  instructions: string;
  image : string;
  createdAt: Date;
  updatedAt: Date;
  dietType : string;
}
/* id            Int            @id @default(autoincrement())
name          String
description   String
ingredients   String
calories      Float
dietType      String
image         String
createdAt     DateTime       @default(now())
updatedAt     DateTime       @updatedAt
Allergies     String         @default("[]")
dietPlanMeals DietPlanMeal[] */