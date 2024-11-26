import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { UuidModule } from 'nestjs-uuid';
import {LocalStrategy} from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
      global: true,
    }),
    UuidModule ,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT, 10 )   ,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      },
    })
  ],
  providers: [AuthService , PrismaClient , LocalStrategy ,JwtStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}