import { Body, Controller, Get, Post, UseGuards, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { LocalGuard } from '../guards/local.guard';
import { AccessToken } from '../util/accessToken';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RequestWithUser } from '../util/request';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: RequestWithUser): Promise<AccessToken> {
        return req.user;
    }

    @Post('register')
    async register(@Body() authPayLoad: RegisterUserDto) {
        const result = await this.authService.signUp(authPayLoad);
        return !result ? { error: 'Invalid credentials' } : result;
    }

    @Get('confirm-email')
    @UseGuards(JwtAuthGuard)
    async confirmEmail(@Req() req: RequestWithUser) {
        return await this.authService.sendConfirmationEmail(req.user.email, req.user.sub);
    }

    @Post('forget-password')
    async forgetPassword(@Body('email') email: string) {
        return await this.authService.forgetPassword(email); 
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users')
    async getAllUsers(
        @Query('pageNumber') pageNumber: number = 1, 
        @Query('pageSize') pageSize: number = 10
    ) {
        return await this.authService.getAllUsers(pageNumber, pageSize);
    }
}
