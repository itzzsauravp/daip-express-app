import { Request, Response } from 'express';
import { walletService } from '../../wallet-management.module';
import { SuccessResponse } from 'src/helpers/general.helpers';
import { HTTP_STATUS } from 'src/constants/http.constants';

export async function create(req: Request, res: Response) {
  const userId = req.userId;
  const wallet = await walletService.registerWallet(userId);
  return SuccessResponse(res, HTTP_STATUS.CREATED, 'wallet created successfully', wallet)
}

export async function info(req: Request, res: Response) {
  const { walletId } = req.params;
  const { user } = req.query;
  const wallet = await walletService.getWalletInfo(walletId as string, user as string);

  return SuccessResponse(res, HTTP_STATUS.OK, null, wallet);
}

export async function load(req: Request, res: Response) {
  const { walletId } = req.params;
  const { amount } = req.query;
  await walletService.loadBalance(walletId as string, Number(amount));

  return SuccessResponse(res, HTTP_STATUS.OK, `${amount} has been loaded to the wallet`);
}

export async function withdraw(req: Request, res: Response) {
  const { walletId } = req.params;
  const { amount } = req.query;
  await walletService.withdrawFunds(walletId as string, Number(amount));

  return SuccessResponse(res, HTTP_STATUS.OK, `${amount} has been withdrawn`);
}

export async function transfer(req: Request, res: Response) {
  const { sendersWalletId, receiversWalletId } = req.params;
  const { amount } = req.query;
  const data = await walletService.transferFunds(sendersWalletId as string, receiversWalletId as string, Number(amount))

  return SuccessResponse(res, HTTP_STATUS.OK, `${amount} has been transfered`, data);
}