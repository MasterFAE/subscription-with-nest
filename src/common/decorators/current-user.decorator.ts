import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user.id = parseInt(req.user.id);
    if (!data) return req.user;
    return req.user[data];
  },
);
