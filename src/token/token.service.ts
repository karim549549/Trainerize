import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from "prisma/prisma.service";
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService){}


  async createToken(userId: string,   type :string ):Promise<Partial<Token>>{
    return  await this.prisma.token.create({
      data:{
        userId,
        type,
        expireAt:new Date(Date.now() +  60 * 60)
      }
    })
  }
  async storeTokenInCookie(res:Response, token:Partial<Token>):Promise<void> {
    res.cookie('refreshToken', token.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge:token.expireAt.getTime()
    });
  }
  async getTokenById(id: string):Promise<Token> {
    return await this.prisma.token.findUnique({where:{id},include:{user:true}})
  }

  async deleteTokenById(id: string):Promise<Partial<Token>> {
    return await this.prisma.token.delete({where:{id}})
  }

  
  
}
