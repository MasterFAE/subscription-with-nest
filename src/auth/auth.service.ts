import { Injectable } from '@nestjs/common';

import { RegisterDTO } from './dto/index.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    const result = await argon.verify(user.password, password);
    if (!result) return null;
    const tokens = await this.updateTokens(user);
    return { ...user, ...tokens };
  }

  async register(data: RegisterDTO) {
    // Hash password
    let hashPassword: string = await argon.hash(data.password);
    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      select: {
        // Don't return password
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    // Create Tokens
    const tokens = await this.updateTokens(user);
    // Return user and tokens
    return { ...user, ...tokens };
  }

  /*
   * Calls Generate tokens and saves them to the database
   * @param user
   * @returns {access_token, refresh_token}
   */
  async updateTokens(user) {
    let tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
    });
    let hashRefreshToken = await argon.hash(tokens.refresh_token);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashRefreshToken, lastLogin: new Date() },
    });
    return { ...tokens };
  }

  /*
   * Generate tokens
   * @param payload
   * @returns {access_token, refresh_token}
   */
  async generateTokens(payload: { id: number; email: string }) {
    let access_token = await this.jwtService.signAsync(
      {
        id: payload.id,
        email: payload.email,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_TOKEN_EXPIRE_DATE'),
      },
    );
    let refresh_token = await this.jwtService.signAsync(
      { id: payload.id, email: payload.email },
      {
        secret: this.configService.get('REFRESH_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE_DATE'),
      },
    );
    return { access_token, refresh_token };
  }
}
