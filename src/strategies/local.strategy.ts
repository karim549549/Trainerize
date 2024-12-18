import {  Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import  {Strategy} from  'passport-local'
import { AuthService } from "../auth/auth.service";

@Injectable()
export class  LocalStrategy extends  PassportStrategy(Strategy){
    constructor( private readonly authService :  AuthService){
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {        
        const AccessToken = await this.authService.login(email, password);
        console.log(AccessToken);
        if (!AccessToken) {
            return { message: 'Invalid credentials' , status:'failed' }
        }
        return AccessToken;
    }
}