import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentCompanyId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub'];
  },
);
