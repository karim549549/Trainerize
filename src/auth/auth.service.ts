import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AccessToken } from 'src/util/AccessToken';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { User } from '@prisma/client';
import { UuidService } from 'nestjs-uuid';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        private readonly repository: PrismaClient,
        private readonly jwtProvider: JwtService,
        private readonly uuidService: UuidService,
        private readonly mailerService: MailerService
    ) {}

    async login(email: string, password: string): Promise<AccessToken | null> {
        const foundUser = await this.repository.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!foundUser || !(await bcrypt.compare(password, foundUser.passwordHash))) {
            return null;
        }

        return new AccessToken(
            await this.jwtProvider.signAsync(
                { email: foundUser.email, role: foundUser.role, sub: foundUser.id }
            ),
            new Date(Date.now() + 900 * 1000), 
            foundUser.role
        );
    }

    async signUp(user: RegisterUserDto): Promise<AccessToken> {
        const foundUser = await this.repository.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (foundUser) {
            throw new Error('Email already exists');
        }

        const insertedUser = await this.repository.user.create({
            data: {
                email: user.email,
                passwordHash: await bcrypt.hash(user.password, 10),
                name: user.name,
                gender: user.gender,
                age: user.age,
                height: user.height,
                weight: user.weight,
                calorieTarget: user.calorieTarget,
            },
        });

        return new AccessToken(
            await this.jwtProvider.signAsync(
                { email: insertedUser.email, role: insertedUser.role, sub: insertedUser.id }
            ),
            new Date(Date.now() + 900 * 1000),
            insertedUser.role
        );
    }

    async getAllUsers(pageNumber: number = 1, pageSize: number = 10): Promise<User[]> {
        return await this.repository.user.findMany(
            {
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            }
        );
    }

    async forgetPassword(email: string): Promise<{ message: string }> {
        const user = await this.repository.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user || !user.isEmailConfirmed) {
            return { message: 'Email not found' };
        }

        const verificationToken = await this.repository.verificationToken.create({
            data: {
                id: this.uuidService.generate({ version: 4 }),
                userId: user.id,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
            },
        });

        const url = `http://localhost:3000/auth/reset-password/${verificationToken.id}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            text: `Click here to reset your password: ${url}`,
        });

        return { message: 'Email sent successfully.' };
    }

    async sendConfirmationEmail(email: string, userId: string): Promise<{ message: string }> {
        const verificationToken = await this.repository.verificationToken.create({
            data: {
                id: this.uuidService.generate({ version: 4 }),
                userId: userId,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
            },
        });

        const url = `http://localhost:3000/auth/confirm/${verificationToken.id}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Confirm Email',
            text: `Click here to confirm your email: ${url}`,
        });

        return { message: 'Email sent successfully.' };
    }
}
