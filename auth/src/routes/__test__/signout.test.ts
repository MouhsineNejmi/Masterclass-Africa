import request from 'supertest';
import { app } from '../../app';

it('should clear the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'test1234',
    })
    .expect(201);

  const response = await request(app).post('/api/users/signout').expect(200);

  const cookies = response.get('Set-Cookie');
  expect(cookies && cookies.length > 0 ? cookies[0] : '').toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
