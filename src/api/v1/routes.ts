import { Router } from 'express';
import authRouter from 'src/modules/identity/api/routes/auth.routes';
import transactionRouter from 'src/modules/wallet-management/api/routes/transaction.routes';
import walletRouter from 'src/modules/wallet-management/api/routes/wallet.routes';
import { tokenProvider } from 'src/modules/identity/identity.module';
import { authMiddleware } from 'src/middlewares/auth.middleware';

const v1Router = Router();
const protect = authMiddleware(tokenProvider);

v1Router.use('/auth', authRouter);
v1Router.use('/wallet', protect, walletRouter);
v1Router.use('/transaction', protect, transactionRouter);

export default v1Router;
