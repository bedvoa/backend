import { SetMetadata } from '@nestjs/common';

export const Public = (data: any) => SetMetadata('public', data);
