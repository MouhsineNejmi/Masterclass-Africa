import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';
import { Member } from '../../models/member';
import mongoose from 'mongoose';

it('should has a route handler listening to /api/groups/:id/members for post request', async () => {
  const response = await request(app).post('/api/groups/:id/members').send({});
  expect(response.status).not.toEqual(404);
});

it('should only be accessed if user is signed in', async () => {
  await request(app).post('/api/groups/:id/members').send({}).expect(401);
});

it('should create a new member when group created successfully', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  let members = await Member.find({});
  expect(members.length).toEqual(0);

  const response = await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId,
    });

  members = await Member.find({});
  expect(members.length).toEqual(1);
});

it('should create return a 400 a member joined already a group', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const cookie = signin();

  const response = await request(app)
    .post('/api/groups')
    .set('Cookie', cookie)
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId,
    });

  await request(app)
    .post(`/api/groups/${response.body.id}/members`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});
