import { NotFoundError, requireAuth } from '@nmasterclass-africa/common';
import express, { Request, Response } from 'express';
import { Group } from '../models/group';

const router = express.Router();

router.get(
  '/api/groups/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      throw new NotFoundError();
    }

    res.status(200).send(group);
  }
);

export { router as showGroupRoute };
