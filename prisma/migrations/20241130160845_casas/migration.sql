BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [subscriptionId] INT;

-- CreateTable
CREATE TABLE [dbo].[UserSubscription] (
    [userId] NVARCHAR(1000) NOT NULL,
    [subscriptionTierId] INT NOT NULL,
    [startedAt] DATETIME2 NOT NULL CONSTRAINT [UserSubscription_startedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [endAt] DATETIME2 NOT NULL,
    CONSTRAINT [UserSubscription_pkey] PRIMARY KEY CLUSTERED ([userId],[subscriptionTierId])
);

-- CreateTable
CREATE TABLE [dbo].[SubscriptionTier] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [features] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    CONSTRAINT [SubscriptionTier_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [SubscriptionTier_name_key] UNIQUE NONCLUSTERED ([name])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
