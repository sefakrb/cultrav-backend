import { changePasswordDto } from './dto/change-password.dto';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { registerDto } from './dto/register.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    const users = await this.prisma.users_information.findMany();
    return users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.prisma.users_information.findFirst({
      where: {
        user_mail: username,
      },
    });
  }

  async createUser(registerData: registerDto) {
    const isExist = await this.prisma.users_information.findFirst({
      where: {
        user_mail: registerData.email,
      },
    });

    if (isExist) {
      return { code: '0', message: 'kullanıcı zaten kayıtlı' };
    }

    const encrypted = this.encrytPass(registerData.password);

    const register = await this.prisma.users_information.create({
      data: {
        user_mail: registerData.email,
        user_name: registerData.username,
        user_password: encrypted.toString('base64'),
      },
    });

    return { code: '1', message: 'kullanıcı kayıt oldu' };
  }

  async changePassword(userID: number, changePasswordData: changePasswordDto) {
    const user = await this.prisma.users_information.findFirst({
      where: {
        user_id: userID,
      },
    });

    const encryptedNewPass = this.encrytPass(changePasswordData.newPassword);
    const encryptedOldPass = this.encrytPass(changePasswordData.oldPassword);

    if (user && user.user_password === encryptedOldPass) {
      const updatePassword = await this.prisma.users_information.update({
        where: {
          user_id: userID,
        },
        data: {
          user_password: encryptedNewPass,
        },
      });
      return { code: '1', message: 'şifre değiştirildi' };
    }

    return { code: '0', message: 'eski şifre yanlış' };
  }

  encrytPass(password: string) {
    let crypto = require('crypto');

    let cipher = crypto.createCipheriv(
      'aes-128-ctr',
      process.env.PASSWORD_KEY,
      process.env.IV,
    );

    let encryptedPassword = cipher.update(password);

    encryptedPassword = Buffer.concat([encryptedPassword, cipher.final()]);

    return encryptedPassword.toString('base64');
  }
}
