import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/auth-helper';

it('should return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/groups/${id}`)
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(404);
});

it('should return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/groups/${id}`)
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(401);
});

it('should return a 401 if the user does not own the group', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
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

  await request(app)
    .put(`/api/groups/${response.body.id}`)
    .set('Cookie', signin())
    .send({
      name: 'group name 1',
      category: 'category 1',
      gallery: ['gallery'],
      description: 'the best',
      privacy: 'PUBLIC',
      active: true,
      userId,
    })
    .expect(401);
});

it('should return a 400 if the user provide invalid inputs', async () => {
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
    });

  await request(app)
    .put(`/api/groups/${response.body.id}`)
    .set('Cookie', signin())
    .send({
      name: '',
      category: '',
      gallery: [''],
      description: '',
      privacy: '',
      active: null,
    })
    .expect(400);
});

it('should update the group provided valid inputs', async () => {
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
    });

  await request(app)
    .put(`/api/groups/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      name: 'group name 2',
      category: 'category 2',
      gallery: ['gallery-2'],
      description: 'the best',
      privacy: 'PUBLIC',
      active: true,
    })
    .expect(200);

  const groupResponse = await request(app)
    .get(`/api/groups/${response.body.id}`)
    .set('Cookie', signin())
    .send();

  expect(groupResponse.body.name).toEqual('group name 2');
  expect(groupResponse.body.category).toEqual('category 2');
});
