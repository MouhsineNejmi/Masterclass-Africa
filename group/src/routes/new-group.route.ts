import { requireAuth, validateRequest } from '@nmasterclass-africa/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Group } from '../models/group';
import { Member } from '../models/member';

const router = express.Router();

router.post(
  '/api/groups',
  requireAuth,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('thumbnail')
      .optional()
      .isString()
      .withMessage('Thumbnail must be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('gallery')
      .optional()
      .isArray()
      .withMessage('Gallery must be an array')
      .custom((value) =>
        value.every((item: string) => typeof item === 'string')
      )
      .withMessage('All items in gallery must be strings'),
    body('jsonDescription')
      .optional()
      .isString()
      .withMessage('jsonDescription must be a string'),
    body('htmlDescription')
      .optional()
      .isString()
      .withMessage('htmlDescription must be a string'),
    body('icon').optional().isString().withMessage('Icon must be a string'),
    body('category').notEmpty().withMessage('Category is required'),
    body('privacy')
      .optional()
      .isIn(['PRIVATE', 'PUBLIC'])
      .withMessage('Privacy must either Private or Public'),
    body('active').optional().isBoolean().withMessage('Active must a boolean'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      category,
      thumbnail,
      description,
      gallery,
      jsonDescription,
      htmlDescription,
      icon,
      privacy,
      active,
    } = req.body;

    const group = Group.build({
      name,
      category,
      thumbnail,
      description,
      gallery,
      jsonDescription,
      htmlDescription,
      icon,
      privacy,
      active,
      userId: req.currentUser!.id,
    });
    await group.save();

    const member = Member.build({
      groupId: group.id,
      userId: req.currentUser!.id,
    });
    await member.save();

    res.status(201).send(group);
  }
);

export { router as newGroupRoute };
