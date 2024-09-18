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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // basic token
  @Post('register')
  async registerUser(@Headers('authorization') token: string) {
    return await this.authService.register(token);
  }

  // basic token
  @Post('login')
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
