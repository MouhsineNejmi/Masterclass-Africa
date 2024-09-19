import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@nmasterclass-africa/common';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
