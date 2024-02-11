import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserBase } from 'src/modules/user/entities/user.entity';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserBase;
  },
);
