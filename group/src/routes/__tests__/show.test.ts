import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';
import mongoose from 'mongoose';

it('should return a 404 if the group is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/groups/${id}`)
    .set('Cookie', signin())
    .send()
    .expect(404);
});

it('should return the group if the group is found', async () => {
  const group = {
    name: 'group name',
    category: 'category',
    gallery: ['gallery-1'],
    description: 'the best course in the world',
    privacy: 'PRIVATE',
    active: false,
    userId: '121fsgsfg2123',
  };

  const response = await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send(group)
    .expect(201);

  const groupResponse = await request(app)
    .get(`/api/groups/${response.body.id}`)
    .set('Cookie', signin())
    .send()
    .expect(200);

  expect(groupResponse.body.name).toEqual(group.name);
});
