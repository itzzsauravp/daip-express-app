import { Router } from 'express';
import { authRouter, tokenProvider } from 'src/modules/identity';
import { transactionRouter, walletRouter } from 'src/modules/wallet-management';
import { authMiddleware } from 'src/shared/api/middlewares/auth.middleware';

const v1Router = Router();
const protect = authMiddleware(tokenProvider);

v1Router.use('/auth', authRouter);
v1Router.use('/wallet', protect, walletRouter);
v1Router.use('/transaction', protect, transactionRouter);

export default v1Router;
