import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
  
  constructor() {

  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {    
    return req.user;
  }
}