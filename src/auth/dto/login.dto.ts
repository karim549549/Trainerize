import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'karimkhaled549@gmail.com',  
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'karim549',  
  })
  password: string;
}