import { Router } from 'express';
import { create, info, load, withdraw, transfer } from '../controllers/wallet.controller';

const walletRouter = Router();

walletRouter.post('/', create);
walletRouter.get('/info/:walletId', info);
walletRouter.post('/load/:walletId', load);
walletRouter.post('/withdraw/:walletId', withdraw);
walletRouter.post('/transfer/:sendersWalletId/:receiversWalletId', transfer)

export default walletRouter;
