import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  providers: [TokenService , PrismaService],
})
export class TokenModule {}
