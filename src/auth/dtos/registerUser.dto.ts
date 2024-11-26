export class RegisterUserDto{
  email: string;
  password: string;
  name: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  calorieTarget: number;
  allergies ?: string[];
}