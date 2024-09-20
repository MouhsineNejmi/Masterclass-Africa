import {
  BadRequestError,
  NotFoundError,
  requireAuth,
} from '@nmasterclass-africa/common';
import express, { Request, Response } from 'express';
import { Group } from '../models/group';
import { Member } from '../models/member';

const router = express.Router();

router.post(
  '/api/groups/:id/members',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.currentUser?.id!;

    const group = await Group.findById(id);
    const existingMember = await Member.find({
      userId: req.currentUser!.id,
      groupId: id,
    });

    if (!group) {
      throw new NotFoundError();
    }

    if (existingMember) {
      throw new BadRequestError('Member already joined this group');
    }

    const member = Member.build({
      groupId: id,
      userId,
    });
    await member.save();

    res.status(201).send(member);
  }
);

export { router as newGroupMemberRoute };
