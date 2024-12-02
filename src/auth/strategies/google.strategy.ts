import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SignUpDto } from '../../user/dtos/createUser.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const googleUser: SignUpDto = {
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName}`,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken,
      googleId: profile.id,
      photoUrl: photos[0].value,
      password:'',
    };
    return done(null, googleUser);
  }
}
