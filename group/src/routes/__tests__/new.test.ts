import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';
import { Group } from '../../models/group';

it('should has a route handler listening to /api/groups for post request', async () => {
  const response = await request(app).post('/api/groups').send({});
  expect(response.status).not.toEqual(404);
});

it('should only be accessed if user is signed in', async () => {
  await request(app).post('/api/groups').send({}).expect(401);
});

it('should returns a status other than 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('should returns an error if an invalid name is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: '',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid category is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: '',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid description is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 10,
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid gallery is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: 10,
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid privacy is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 10,
      active: false,
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid active is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 'PRIVATE',
      active: '',
      userId: '121fsgsfg2123',
    })
    .expect(400);
});

it('should returns an error if an invalid userId is provided', async () => {
  await request(app)
    .post('/api/groups')
    .set('Cookie', signin())
    .send({
      name: 'group name',
      category: 'category',
      gallery: ['gallery-1'],
      description: 'the best course in the world',
      privacy: 10,
      active: false,
      userId: '',
    })
    .expect(400);
});

it('should create a new group with valid inputs', async () => {
  let groups = await Group.find({});
  expect(groups.length).toEqual(0);

  await request(app)
    .post('/api/groups')
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
    .expect(201);

  groups = await Group.find({});
  expect(groups.length).toEqual(1);
});
