import { Body, Controller, Get, Post, UseGuards , Req   } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { LocalGuard } from '../guards/local.guard';
import { AccessToken } from '../util/accessToken';
import  {JwtAuthGuard} from '../guards/jwt.guard';
import {RequestWithUser} from '../util/request';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: RequestWithUser): Promise<AccessToken> {
        return req.user;
    }
    @Post('register')
    async register(@Body() authPayLoad :RegisterUserDto) {
        const result  = await this.authService.signUp(authPayLoad);
        return !result ? {error : 'Invalid credentials'} : result;
    }
    @Get('confirm-email')
    @UseGuards(JwtAuthGuard)
    async confirmEmail(@Req() req: RequestWithUser) {
        return await this.authService.sendConfirmationEmail(req.user.email , req.user.sub);
    }
    @Post('forget-password')
    async forgetPassword(@Body('email') email: string) {
        return await this.authService.forgetPassword(email); 
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getAllUsers() {
        return await this.authService.getAllUsers();
    }
    
    
}
