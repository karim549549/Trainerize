BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Recipe] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [instruction] NVARCHAR(1000),
    [ingrediants] NVARCHAR(1000) NOT NULL,
    [servingPerGram] INT NOT NULL,
    [calories] INT NOT NULL,
    [totalFat] INT NOT NULL,
    [saturatedFat] INT NOT NULL,
    [totalCarbohydrate] INT NOT NULL,
    [sugar] INT NOT NULL,
    [fiber] INT NOT NULL,
    [Protein] INT NOT NULL,
    [imageUrl] NVARCHAR(1000),
    [peraperationTimePerMin] INT NOT NULL,
    [categoryId] INT NOT NULL,
    CONSTRAINT [Recipe_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Category_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
