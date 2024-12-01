import { LoginDto } from './login.dto';
import { PickType } from '@nestjs/swagger';

export class ForgetPasswordDto extends PickType(LoginDto, ['email'] as const) {}
