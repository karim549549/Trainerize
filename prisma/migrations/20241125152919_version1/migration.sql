BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    [age] INT,
    [height] FLOAT(53),
    [weight] FLOAT(53),
    [calorieTarget] FLOAT(53) NOT NULL,
    [allergies] NVARCHAR(1000) CONSTRAINT [User_allergies_df] DEFAULT '[]',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Recipe] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [ingredients] NVARCHAR(1000) NOT NULL,
    [calories] FLOAT(53) NOT NULL,
    [dietType] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Recipe_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Recipe_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DietPlan] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [calorieTarget] FLOAT(53) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DietPlan_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [DietPlan_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DietPlanMeal] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dietPlanId] INT NOT NULL,
    [recipeId] INT NOT NULL,
    [mealTime] NVARCHAR(1000) NOT NULL,
    [day] INT NOT NULL,
    [scheduledAt] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DietPlanMeal_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [DietPlanMeal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserAllergy] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [allergy] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserAllergy_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [UserAllergy_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RecipeAllergyFlag] (
    [id] INT NOT NULL IDENTITY(1,1),
    [recipeId] INT NOT NULL,
    [allergy] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RecipeAllergyFlag_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [RecipeAllergyFlag_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SubscriptionTier] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [durationInDays] INT NOT NULL,
    [features] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SubscriptionTier_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [SubscriptionTier_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserSubscription] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [tierId] INT NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [isActive] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserSubscription_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [UserSubscription_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [User_calorieTarget_idx] ON [dbo].[User]([calorieTarget]);

-- AddForeignKey
ALTER TABLE [dbo].[DietPlan] ADD CONSTRAINT [DietPlan_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DietPlanMeal] ADD CONSTRAINT [DietPlanMeal_dietPlanId_fkey] FOREIGN KEY ([dietPlanId]) REFERENCES [dbo].[DietPlan]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DietPlanMeal] ADD CONSTRAINT [DietPlanMeal_recipeId_fkey] FOREIGN KEY ([recipeId]) REFERENCES [dbo].[Recipe]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserAllergy] ADD CONSTRAINT [UserAllergy_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecipeAllergyFlag] ADD CONSTRAINT [RecipeAllergyFlag_recipeId_fkey] FOREIGN KEY ([recipeId]) REFERENCES [dbo].[Recipe]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSubscription] ADD CONSTRAINT [UserSubscription_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSubscription] ADD CONSTRAINT [UserSubscription_tierId_fkey] FOREIGN KEY ([tierId]) REFERENCES [dbo].[SubscriptionTier]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
