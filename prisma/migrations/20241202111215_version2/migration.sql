BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [googleId] NVARCHAR(1000),
    [passwordHash] NVARCHAR(1000),
    [username] NVARCHAR(1000) NOT NULL,
    [subscriptionId] INT,
    [photoUrl] NVARCHAR(1000),
    [googleAccessToken] NVARCHAR(1000),
    [TokenRefreshToken] NVARCHAR(1000),
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'USER',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

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

-- CreateTable
CREATE TABLE [dbo].[Token] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Token_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [expireAt] DATETIME2 NOT NULL,
    CONSTRAINT [Token_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [User_email_idx] ON [dbo].[User]([email]);

-- AddForeignKey
ALTER TABLE [dbo].[Token] ADD CONSTRAINT [Token_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
