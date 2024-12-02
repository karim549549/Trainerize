import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'karim khaled',  
  })
  username: string;
  @ApiProperty({
    example: 'karim549',  
  })
  password: string;
  @ApiProperty({
    example: 'karimkhaled549@gmail.com',  
  })
  email: string;
  googleId: string;
  googleAccessToken:string;
  googleRefreshToken:string;
  photoUrl:string;
}