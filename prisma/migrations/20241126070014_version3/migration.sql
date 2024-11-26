/*
  Warnings:

  - You are about to drop the column `day` on the `DietPlanMeal` table. All the data in the column will be lost.
  - You are about to drop the column `mealTime` on the `DietPlanMeal` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledAt` on the `DietPlanMeal` table. All the data in the column will be lost.
  - Added the required column `scheduleAt` to the `DietPlanMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DietPlanMeal] DROP COLUMN [day],
[mealTime],
[scheduledAt];
ALTER TABLE [dbo].[DietPlanMeal] ADD [scheduleAt] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [role] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
