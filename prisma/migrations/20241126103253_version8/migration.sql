/*
  Warnings:

  - You are about to drop the column `calorieTarget` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `durationInDays` on the `SubscriptionTier` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `SubscriptionTier` table. All the data in the column will be lost.
  - You are about to drop the `RecipeAllergyFlag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAllergy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pricePerMonth` to the `SubscriptionTier` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[RecipeAllergyFlag] DROP CONSTRAINT [RecipeAllergyFlag_recipeId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserAllergy] DROP CONSTRAINT [UserAllergy_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[DietPlan] DROP COLUMN [calorieTarget];

-- AlterTable
ALTER TABLE [dbo].[Recipe] ADD [Allergies] NVARCHAR(1000) NOT NULL CONSTRAINT [Recipe_Allergies_df] DEFAULT '[]';

-- AlterTable
ALTER TABLE [dbo].[SubscriptionTier] DROP COLUMN [durationInDays],
[price];
ALTER TABLE [dbo].[SubscriptionTier] ADD [pricePerMonth] FLOAT(53) NOT NULL;

-- DropTable
DROP TABLE [dbo].[RecipeAllergyFlag];

-- DropTable
DROP TABLE [dbo].[UserAllergy];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
