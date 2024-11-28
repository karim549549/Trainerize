import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
  ArrayNotEmpty,
  MinLength,
  
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEmail()

  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8) 

  passwordHash: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'], { message: 'Gender must be male, female' })
  gender: string;

  @IsNumber()
  @Min(0)
  @Max(120)
  age: number;

  @IsNumber()
  @Min(0)
  height: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(1200)
  @Max(5000)
  calorieTarget: number;

  @IsNotEmpty()
  @IsEnum(['USER', 'ADMIN'], { message: 'InValid Role' })
  role: string;

  @IsOptional()
  @ArrayNotEmpty()
  allergies?: string[];

  @IsNotEmpty()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  deletedAt: Date;
}
