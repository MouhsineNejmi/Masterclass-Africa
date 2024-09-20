import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@nmasterclass-africa/common';
import cookieSession from 'cookie-session';

import { indexGroupsRoute } from './routes/index.route';
import { newGroupRoute } from './routes/new-group.route';
import { showGroupRoute } from './routes/show-group.route';
import { updateGroupRoute } from './routes/update-group.route';
import { newGroupMemberRoute } from './routes/new-member.route';
import { showGroupMembersRoute } from './routes/show-group-members.route';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(indexGroupsRoute);
app.use(newGroupRoute);
app.use(showGroupRoute);
app.use(updateGroupRoute);

app.use(newGroupMemberRoute);
app.use(showGroupMembersRoute);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
