import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 만약에 Public 데코레이터가 존재하면 true를 반환
    const isPublic = this.reflector.get('public', context.getHandler());
    if (typeof isPublic === 'boolean' && isPublic) {
      return true;
    }

    // 요청에서 user 객체가 존재하는지 확인
    // Guard는 Middleware 다음에 실행되기 때문에 BearerTokenMiddleware에서 user 객체를 받아옴
    /**
     * sub: user id
     * role: user role
     * type: token type (access or refresh)
     * iat: issued at
     * exp: expiration time
     */
    const request = context.switchToHttp().getRequest();

    if (!request.user || request.user.type !== 'access') {
      return false;
    }

    return true;
  }
}
