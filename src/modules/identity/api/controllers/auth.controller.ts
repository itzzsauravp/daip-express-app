import { Request, Response } from 'express';
import { SuccessResponse } from 'src/helpers/general.helpers';
import { HTTP_STATUS } from 'src/constants/http.constants';
import { authService } from '../../identity.module';

export async function signup(req: Request, res: Response) {
  const data = req.body;
  const user = await authService.registerUser(data);

  return SuccessResponse(
    res,
    HTTP_STATUS.CREATED,
    'user registered successfully',
    user,
  );
}

export async function login(req: Request, res: Response) {
  const data = req.body;
  const { user, token, refreshToken } = await authService.loginUser(data);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return SuccessResponse(res, HTTP_STATUS.OK, 'login successful', {
    token,
    user,
  });
}

export async function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  const { token, newRefreshToken } = await authService.tokenRefresh(refreshToken);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return SuccessResponse(res, HTTP_STATUS.OK, 'login successful', {
    token,
  });
}

export function logout(req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/api/v1/auth/refresh',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return SuccessResponse(res, HTTP_STATUS.OK, 'logout successful');

}
