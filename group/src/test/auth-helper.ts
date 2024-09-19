import request from 'supertest';
import { app } from '../app';

export const signin = async () => {
  const email = 'test@test.com';
  const password = 'test1234';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.headers['set-cookie'];
  return cookie;
};
