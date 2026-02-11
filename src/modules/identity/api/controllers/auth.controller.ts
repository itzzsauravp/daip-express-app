import { Request, Response } from 'express';
import authService from '../../app/auth.service';
import { SuccessResponse } from 'src/helpers/general.helpers';
import { HTTP_STATUS } from 'src/constants/http.constants';

export async function signup(req: Request, res: Response) {
  const data = req.body;
  const user = await authService.registerUser(data);
  return SuccessResponse(
    res,
    HTTP_STATUS.CREATED,
    'user registered successfully',
    user.toResponseFormat(),
  );
}
export async function login(req: Request, res: Response) {
  const data = req.body;
  await authService.loginUser(data);
  res.send('login will be here');
}
export function refresh(req: Request, res: Response) {
  res.send('refresh will be here');
}
export function logout(req: Request, res: Response) {
  res.send('logout will be here');
}
