import {
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { JwtAuthGuard } from './strategy/jwt.strategy';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // basic token
  @Public(true)
  @Post('register') // 회원가입
  async registerUser(@Headers('authorization') token: string) {
    return await this.authService.register(token);
  }

  // basic token
  @Public(true)
  @Post('login') // 로그인
  loginUser(@Headers('authorization') token: string) {
    return this.authService.login(token);
  }

  @Post('token/access')
  async rotateAccessToken(@Request() req: any) {
    const payload = await this.authService.parseBearerToken(req.user, true);
    return {
      accessToken: await this.authService.issueToken(payload, false),
    };
  }

  @Post('login/passport')
  @UseGuards(LocalAuthGuard)
  async loginUserPassport(@Request() req) {
    return {
      refreshToken: await this.authService.issueToken(req.user, true),
      accessToken: await this.authService.issueToken(req.user, false),
    };
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  async private(@Request() req) {
    return req.user;
  }
}
