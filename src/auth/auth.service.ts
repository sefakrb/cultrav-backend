import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    let crypto = require('crypto');

    let cipher = crypto.createCipheriv(
      'aes-128-ctr',
      process.env.PASSWORD_KEY,
      process.env.IV,
    );

    let encrypted = cipher.update(pass);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    if (user && user.user_password === encrypted.toString('base64')) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user_mail, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user: any) {
    return {
      message: 'logged out',
    };
  }
}
