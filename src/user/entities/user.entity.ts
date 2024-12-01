export class  User{
  id: string;
  email: string;
  isEmailConfirmed: boolean;
  passwordHash: string;
  username: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date
}