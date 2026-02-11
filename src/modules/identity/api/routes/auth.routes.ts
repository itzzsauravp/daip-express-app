import { Router } from 'express';
import { signup, login, logout, refresh } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.get('/logout', logout);

export default authRouter;
