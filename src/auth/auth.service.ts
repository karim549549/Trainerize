import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../user/dtos/createUser.dto';
import { Result } from 'src/utils/result';
import { AuthResponse } from './dto/auth.response';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { Response } from 'express';
import { EmailSender } from 'src/emailsender/emailsender.service';
import { EmailFactory } from 'src/emailsender/factories/email.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly emailSender: EmailSender,
    private readonly emailFactory: EmailFactory,
  ) {}

  async signUp(signUpDto: SignUpDto, res: Response): Promise<Result<AuthResponse>> {
    const existingUser = await this.userRepository.findUserByEmail(signUpDto.email);
    if (existingUser) {
      return new Result<AuthResponse>(false, null, 409, 'User already exists.');
    }
    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
    const newUser = await this.userRepository.createUser(signUpDto);
    if (!newUser) {
      return new Result<AuthResponse>(false, null, 400, 'Unable to create user.');
    }

    const accessToken = await this.jwtService.sign({
      email: newUser.email,
      role: newUser.role,
      sub: newUser.id,
    });

    const refreshToken = await this.tokenService.createToken(newUser.id, 'refresh');
    await this.tokenService.storeTokenInCookie(res, refreshToken);
    const data = new AuthResponse(accessToken, refreshToken.expireAt);
    return new Result<AuthResponse>(true, data, 201, 'User created successfully.');
  }

  async login(loginDto: LoginDto, res: Response, tokenId: string): Promise<Result<AuthResponse>> {
    const user = await this.userRepository.findUserByEmail(loginDto.email);
    if (!user || (!(await bcrypt.compare(loginDto.password, user.passwordHash)) && !user.googleId)) {
      return new Result<AuthResponse>(false, null, 401, 'Invalid email or password.');
    }
    const accessToken = await this.jwtService.sign({
      email: user.email,
      role: user.role,
      sub: user.id,
    });
    if  (tokenId) await this.tokenService.deleteTokenById(tokenId);
    const refreshToken = await this.tokenService.createToken(user.id, 'refresh');
    await this.tokenService.storeTokenInCookie(res, refreshToken);
    const data = new AuthResponse(accessToken, refreshToken.expireAt);
    return new Result<AuthResponse>(true, data, 200, 'Login successful.');
  }

  async refreshToken(refreshToken: string, res: Response): Promise<Result<AuthResponse>> {
    const token = await this.tokenService.getTokenById(refreshToken);
    if (!token) {
      return new Result<AuthResponse>(false, null, 401, 'Invalid refresh token.');
    }
    const accessToken = await this.jwtService.sign({
      email: token.user.email,
      role: token.user.role,
      sub: token.user.id,
    });

    await this.tokenService.deleteTokenById(token.id);
    const newRefreshToken = await this.tokenService.createToken(token.userId, 'refresh');
    await this.tokenService.storeTokenInCookie(res, newRefreshToken);

    const data = new AuthResponse(accessToken, newRefreshToken.expireAt);
    return new Result<AuthResponse>(true, data, 200, 'Token refreshed successfully.');
  }

  async forgetPasssword(email: string): Promise<Result<AuthResponse>> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return new Result<AuthResponse>(false, null, 404, 'User not found.');
    }

    const token = await this.tokenService.createToken(user.id, 'reset');
    const yesLink = `${process.env.FORGET_PASSWORD_YES}${token.id}`;
    const noLink = `${process.env.FORGET_PASSWORD_NO}${token.id}`;
    const subject = 'Password Reset';
    const html = await this.emailFactory.createForgetEmail(
      `${token.expireAt}`,
      yesLink,
      noLink,
      'support'
    );

    await this.emailSender.sendMail(user.email, subject, html);

    return new Result<AuthResponse>(true, null, 200, 'Password reset link sent successfully.');
  }

  async signUpWithGoogle(googleUserDto: SignUpDto, res: Response): Promise<Result<AuthResponse>> {
    let user = await this.userRepository.findUserByEmail(googleUserDto.email);
    if (user) {
      user = await this.userRepository.updateUser({
        ...user,
        username: googleUserDto.username,
        email: googleUserDto.email,
        googleId: googleUserDto.googleId,
        googleAccessToken: googleUserDto.googleAccessToken,
        googleRefreshToken: googleUserDto.googleRefreshToken,
        photoUrl: googleUserDto.photoUrl,
      });
    } else {
      user = await this.userRepository.createUser(googleUserDto);
    }

    const accessToken = await this.jwtService.sign({
      email: user.email,
      role: user.role,
      sub: user.id,
    });

    const refreshToken = await this.tokenService.createToken(user.id, 'refresh');
    await this.tokenService.storeTokenInCookie(res, refreshToken);
    const data = new AuthResponse(accessToken, refreshToken.expireAt);
    return new Result<AuthResponse>(true, data, 201, 'User created successfully.');
  }
}
