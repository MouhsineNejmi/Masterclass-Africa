import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('You must give a valid email'),
  password: z
    .string()
    .min(4, { message: 'Your password must be atleast 4 characters long' })
    .max(20, {
      message: 'Your password can not be longer then 64 characters long',
    }),
});

export const SignUpSchema = z.object({
  email: z.string().email('You must give a valid email'),
  password: z
    .string()
    .min(4, { message: 'Your password must be atleast 4 characters long' })
    .max(20, {
      message: 'Your password can not be longer then 20 characters long',
    }),
});
