import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from 'prisma/prisma.service';
import { EmailSender } from 'src/emailsender/emailsender.service';
import { EmailFactory } from 'src/emailsender/factories/email.factory';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UserModule,PassportModule , TokenModule , JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: `${process.env.EXPIRE_AT_JWT}` },
  })],
  controllers: [AuthController],
  providers: [AuthService , UserRepository ,GoogleStrategy ,GoogleAuthGuard ,
    TokenService , PrismaService ,EmailSender ,EmailFactory],
})
export class AuthModule {}
