/*
  Warnings:

  - You are about to drop the column `Allergies` on the `Recipe` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Recipe] DROP COLUMN [Allergies];
ALTER TABLE [dbo].[Recipe] ADD [allergies] NVARCHAR(1000) NOT NULL CONSTRAINT [Recipe_allergies_df] DEFAULT '[]';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
