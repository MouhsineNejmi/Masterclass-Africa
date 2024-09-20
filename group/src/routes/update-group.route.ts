import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  UnauthorizedError,
} from '@nmasterclass-africa/common';
import { Group } from '../models/group';

const router = express.Router();

router.put(
  '/api/groups/:id',
  requireAuth,
  [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('category').optional().notEmpty().withMessage('Category is required'),
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
    body('privacy')
      .optional()
      .isIn(['PRIVATE', 'PUBLIC'])
      .withMessage('Privacy must either Private or Public'),
    body('active').optional().isBoolean().withMessage('Active must a boolean'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
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
    const group = await Group.findById(id);

    if (!group) {
      throw new NotFoundError();
    }

    if (group?.userId !== req.currentUser?.id) {
      throw new UnauthorizedError();
    }

    group.set({
      name: name || group.name,
      category: category || group.category,
      thumbnail: thumbnail || group.thumbnail,
      description: description || group.description,
      gallery: gallery || group.gallery,
      jsonDescription: jsonDescription || group.jsonDescription,
      htmlDescription: htmlDescription || group.htmlDescription,
      icon: icon || group.icon,
      privacy: privacy || group.privacy,
      active: active || group.active,
    });
    await group.save();

    res.send(group);
  }
);

export { router as updateGroupRoute };
