import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Response,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import prismaGenerateException from 'src/common/decorators/exception/prisma-exception-generator';
import { Public } from 'src/common/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/index.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  async logIn(@Req() req, @Res({ passthrough: true }) res) {
    res.cookie('access_token', req.user.access_token, {
      httpOnly: true,
      maxAge: 3.154e10,
      sameSite: 'none',
    });
    res.cookie('refresh_token', req.user.refresh_token, {
      httpOnly: true,
      maxAge: 3.154e10,
      sameSite: 'none',
    });
    return req.user;
  }

  @Public()
  @Post('register')
  async register(
    @Body() body: RegisterDTO,
    @Response({ passthrough: true }) res,
  ) {
    try {
      const result = await this.authService.register(body);
      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        maxAge: 3.154e10,
        sameSite: 'none',
      });
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
        maxAge: 3.154e10,
        sameSite: 'none',
      });
      return result;
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }
}
