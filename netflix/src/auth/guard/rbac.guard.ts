import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/entity/user.entity';

/**
 * RBACGuard는 role 기반 접근 제어를 위한 Guard인데 이 방식의 현재 단점은 아래와 같다
 * ```description
 *   현재 구현된 role은 JWT에 담아서 전달되는데, JWT는 한 번 발급되면 만료되기 전까지 변경되지 않는다.
 *   이미 로그인한 유저의 role이 바뀌었을 때, 즉 로그인한 유저의 role이 변경되었을 때
 *   토큰이 재발급 되기 전까지는 변경된 role이 적용되지 않는다.
 * ```
 *
 * 이러한 단점을 해결하기 위해서
 *   1. 토큰 갱신 메커니즘을 수정하거나
 *   2. role을 DB에서 가져오는 방식을 미들웨어나 Guard에서 매번 가져오는 방식으로 변경을 하거나
 *   3. Redis의 Pub/Sub을 이용하여 role이 변경되었을 때, 해당 유저에게 알림을 주는 방식을 사용하면 된다.
 */

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role: Role = this.reflector.get('rbac', context.getHandler());
    if (!Object.values(Role).includes(role)) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    // AuthGuard를 먼저 통과했는지 검사
    if (!user) {
      return false;
    }

    return user.role <= role;
  }
}
