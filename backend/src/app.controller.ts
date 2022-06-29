import { Controller, Request,  Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guards/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  
}
