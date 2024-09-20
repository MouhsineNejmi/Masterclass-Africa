import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signin = (): string => {
  const id = new mongoose.Types.ObjectId().toHexString();
  // Build a JWT payload { id, email, etc}
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY as string);

  // Build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJson = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // return a string thats the cookie with the encoded data
  return `session=${base64}`;
};
