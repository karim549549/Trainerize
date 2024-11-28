/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Recipe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `SubscriptionTier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Recipe] DROP COLUMN [deletedAt];
ALTER TABLE [dbo].[Recipe] ADD [image] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[SubscriptionTier] ADD CONSTRAINT [SubscriptionTier_name_key] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
