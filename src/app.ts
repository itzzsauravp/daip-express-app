import express from 'express';
import v1Router from './api/v1/routes';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middlewares/error-hanlder.middleware';

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1', v1Router);
app.use(ErrorHandler);

export default app;
