import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/entity/user.entity';

export const RBAC = (role: Role) => SetMetadata('rbac', role);
