import express, { Request, Response } from 'express';
import { Group } from '../models/group';

const router = express.Router();

router.get('/api/groups', async (req: Request, res: Response) => {
  const groups = await Group.find({});
  res.send(groups);
});

export { router as indexGroupsRoute };
