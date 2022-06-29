import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return await this.authService.login(req.user)
    }

    @UseGuards(LocalAuthGuard)
    @Post('register')
    async register(@Request() req) {
      return await this.authService.register(req.user)
    }
}