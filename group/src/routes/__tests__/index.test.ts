import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/auth-helper';

const createGroup = () => {
  return request(app)
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
    });
};

it('should fetch a list of groups', async () => {
  await createGroup();
  await createGroup();
  await createGroup();

  const response = await request(app).get('/api/groups').send().expect(200);
  expect(response.body.length).toEqual(3);
});
