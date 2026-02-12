import type { Request, Response, NextFunction } from 'express';
import { ITokenProvider } from '../../../modules/identity/app/ports/ITokenProvider';
import { BadRequestError, UnauthorizedError } from 'src/shared/domain/errors/errors';

export const authMiddleware = (tokenProvider: ITokenProvider) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) throw new BadRequestError('missing authorization headers');

    const token = authHeaders.split(' ')[1];
    if (!token) throw new BadRequestError('missing bearer token');

    const payload = tokenProvider.verify(token);
    if (!payload.sub) throw new UnauthorizedError('jwt expired');

    req.userId = payload.sub as string;
    next();
  };
};
