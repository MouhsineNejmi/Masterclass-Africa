import { NotFoundError, requireAuth } from '@nmasterclass-africa/common';
import express, { Request, Response } from 'express';
import { Member } from '../models/member';

const router = express.Router();

router.get(
  '/api/groups/:id/members',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const members = await Member.find({ groupId: id });

    if (!members) {
      throw new NotFoundError();
    }

    res.status(200).send(members);
  }
);

export { router as showGroupMembersRoute };
