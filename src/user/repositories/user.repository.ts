import { PrismaService } from "prisma/prisma.service";
import  { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { SignUpDto } from "src/auth/dto/signup.dto";

@Injectable()
export class  UserRepository {
  
  constructor(private prisma: PrismaService) {}
  async findUserByEmail(email: string):Promise<any> {
    return this.prisma.user.findUnique({where:{email}})
  }
  async findUserById(id: string):Promise<any> {
    return this.prisma.user.findUnique({where:{id}})
  }
  async createUser(SignUpDto : SignUpDto):Promise<any> {
    return  this.prisma.user.create({
      data: {
        email: SignUpDto.email,
        passwordHash: SignUpDto.password,
        username: SignUpDto.username
      }
    })
  }
  async updateUser(user: User):Promise<any> {
    return  this.prisma.user.update({where:{id:user.id},data:user})
  }
}