import { IsEmail, IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHTLY_ACTIVE = 'LIGHTLY_ACTIVE',
  MODERATELY_ACTIVE = 'MODERATELY_ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
}

enum DietPreference {
  BALANCED = 'BALANCED',
  KETO = 'KETO',
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
  HIGH_PROTEIN = 'HIGH_PROTEIN',
}

enum FitnessGoal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  GAIN_MUSCLE = 'GAIN_MUSCLE',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
}

export class CreateCustomerDto {
  // User fields
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  googleAccessToken?: string;

  @IsOptional()
  @IsString()
  googleRefreshToken?: string;

  // TrainerProfile fields
  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  goalWeight?: number;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel;

  @IsOptional()
  @IsNumber()
  caloriclntakeGoal?: number;

  @IsOptional()
  @IsEnum(DietPreference)
  dietPreference?: DietPreference;

  @IsOptional()
  @IsString()
  allergies?: string; // String to represent allergies as a comma-separated list

  @IsOptional()
  @IsEnum(FitnessGoal)
  fitnessGoal?: FitnessGoal;

  @IsOptional()
  @IsNumber()
  waterIntakeGoal?: number;

  @IsOptional()
  @IsNumber()
  slepGoal?: number;

  @IsOptional()
  @IsNumber()
  stepGoal?: number;

  @IsOptional()
  @IsString()
  preferredExercise?: string; // String to represent exercises as a comma-separated list

  @IsOptional()
  @IsBoolean()
  notificationsEnable?: boolean;
}
