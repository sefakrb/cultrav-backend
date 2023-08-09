import { changePasswordDto } from './dto/change-password.dto';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { registerDto } from './dto/register.dto';

@Controller('users/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('all')
  async getUsers(@Request() req) {
    return await this.usersService.findAll();
  }

  @Post('/register')
  async register(@Request() req, @Body() registerData: registerDto) {
    const registerResponse = this.usersService.createUser(registerData);
    return registerResponse;
  }

  @Post('/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() changePasswordData: changePasswordDto,
    @Headers() headers,
  ) {
    const changePasspwordResponse = this.usersService.changePassword(
      parseInt(headers.user_id),
      changePasswordData,
    );
    return changePasspwordResponse;
  }
}
