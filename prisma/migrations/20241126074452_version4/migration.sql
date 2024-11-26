/*
  Warnings:

  - Added the required column `isEmailConfirmed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_role_df] DEFAULT 'USER' FOR [role];
ALTER TABLE [dbo].[User] ADD [isEmailConfirmed] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
