BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Recipe] ADD [isDairyFree] BIT NOT NULL CONSTRAINT [Recipe_isDairyFree_df] DEFAULT 0,
[isEggFree] BIT NOT NULL CONSTRAINT [Recipe_isEggFree_df] DEFAULT 0,
[isGlutenFree] BIT NOT NULL CONSTRAINT [Recipe_isGlutenFree_df] DEFAULT 0,
[isNutsFree] BIT NOT NULL CONSTRAINT [Recipe_isNutsFree_df] DEFAULT 0,
[isPeanutFree] BIT NOT NULL CONSTRAINT [Recipe_isPeanutFree_df] DEFAULT 0,
[isShellfishFree] BIT NOT NULL CONSTRAINT [Recipe_isShellfishFree_df] DEFAULT 0,
[isSoyFree] BIT NOT NULL CONSTRAINT [Recipe_isSoyFree_df] DEFAULT 0,
[isWheatFree] BIT NOT NULL CONSTRAINT [Recipe_isWheatFree_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
