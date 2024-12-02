import { PrismaService } from "prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { SignUpDto } from "../dtos/createUser.dto";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  private userSelect = {
    id: true,
    email: true,
    passwordHash: true,
    username: true,
    role: true,
    googleId: true,
    photoUrl: true,
    deletedAt:true
  };

  async findUserByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    });
  }

  async findUserById(id: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  async createUser(signUpDto: SignUpDto): Promise<any> {
    return this.prisma.user.create({
      data: {
        email: signUpDto.email,
        passwordHash: signUpDto.password,
        username: signUpDto.username,
        googleAccessToken: signUpDto.googleAccessToken,
        googleRefreshToken: signUpDto.googleRefreshToken,
        googleId: signUpDto.googleId,
        photoUrl: signUpDto.photoUrl,
      },
      select: this.userSelect,
    });
  }

  async updateUser(user: User): Promise<any> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: user,
      select: this.userSelect,
    });
  }
}
