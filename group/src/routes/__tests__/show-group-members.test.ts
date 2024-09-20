import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';

it('should return 400 member already in the group', async () => {
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
    })
    .expect(201);

  const membersResponse = await request(app)
    .get(`/api/groups/${response.body.id}/members`)
    .set('Cookie', cookie)
    .send();

  expect(membersResponse.body.length).toEqual(1);
});

it('should return the members if the group is found', async () => {
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
    })
    .expect(201);

  const membersResponse = await request(app)
    .get(`/api/groups/${response.body.id}/members`)
    .set('Cookie', cookie)
    .send();

  expect(membersResponse.body.length).toEqual(1);
});
