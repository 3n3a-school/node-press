import { Body, Controller, Get, Logger, Post, Request, UseGuards, } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {    
      return await this.authService.login(req.user)
    }

    @Post('register')
    async register(
      @Request() req
    ) {
      const user: UserDto = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
      }
      return await this.authService.register(user)
    }
}