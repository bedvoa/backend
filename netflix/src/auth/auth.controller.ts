import { Controller, Headers, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Public(true)
  @Post('register')
  async registerUser(@Headers('authorization') token: string) {
    // basic token
    return await this.authService.register(token);
  }

  // 로그인
  @Public(true)
  @Post('login')
  loginUser(@Headers('authorization') token: string) {
    // basic token
    return this.authService.login(token);
  }

  // access token 재발급
  @Post('token/access')
  async rotateAccessToken(@Request() req: any) {
    const payload = await this.authService.parseBearerToken(req.user, true);
    return {
      accessToken: await this.authService.issueToken(payload, false),
    };
  }
}
