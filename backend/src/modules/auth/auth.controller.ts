import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authServise: AuthService){}

    @Post('login')
    async login(@Body() body:{username:string, password:string}){
        return await this.authServise.login(body.username, body.password)
    }
}
