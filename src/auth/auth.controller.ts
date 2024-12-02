import { Controller, Post, Body, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from '../user/dtos/createUser.dto';
import { Response, Request } from 'express';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response): Promise<any> {
    const result = await this.authService.signUp(signUpDto , res);
    return result.isSuccess ? res.status(HttpStatus.CREATED).json({
      status: 'success',
      data: result.data,
    }) : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'failed',
      message: result.message,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response , @Req () req: Request): Promise<any> {
    const result = await this.authService.login(loginDto ,res ,req.cookies['refreshToken']);
    return result.isSuccess ? res.status(HttpStatus.OK).json({
      status: 'success',
      data: result.data,
    }) :
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'failed',
      message: result.message,
    });
  }

  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'failed',
        message: 'Refresh token not found',
      });
    }
    const result = await this.authService.refreshToken(refreshToken ,res);
    return result.isSuccess ? res.status(HttpStatus.OK).json({
      status: 'success',
      data: result.data,
    }) :
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'failed',
      message: result.message,
    });
  }
  
  @Post('forget-password')
  async forgetPasssword(@Body() email: ForgetPasswordDto): Promise<any> {
    const result = await this.authService.forgetPasssword(email.email);
    return result.isSuccess ? {
      status: 'success',
      data: result.data,
    } :
    {
      status: 'failed',
      message: result.message,
    };
  }
  @Get('logout')
  async logout(@Req() req: Request , @Res() res: Response): Promise<any> {
    res.cookie('refreshToken', '', { maxAge: 0 });
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Logout successful',
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google')) 
  async googleLogin() {
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.signUpWithGoogle(req.user, res);
    if (!result.isSuccess) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'failed',
        message: result.message,
      });
    }
    const homeUrl = `http://localhost:3000/home?token=${result.data.accessToken}`;
    return res.redirect(homeUrl);
  }
}
