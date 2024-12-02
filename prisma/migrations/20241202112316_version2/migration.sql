/*
  Warnings:

  - You are about to drop the column `TokenRefreshToken` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [TokenRefreshToken];
ALTER TABLE [dbo].[User] ADD [googleRefreshToken] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
