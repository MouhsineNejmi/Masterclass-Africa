'use client';

import clientAxios from '@/axios/axios-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignUpSchema } from '@/schemas/auth';
import { useMutation } from '@tanstack/react-query';

export const useAuthSignUp = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors: fieldsErrors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
  });
  const [creating, setCreating] = useState<boolean>(false);

  const { mutate: SignUpUser } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await clientAxios.post('/api/users/signup', { email, password });
    },
    onError: (error) => {
      console.error('ERROR FUNCTION: ', error);
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  const signUp = async (email: string, password: string) => {
    setCreating(true);

    try {
      SignUpUser({
        email,
        password,
      });
      setCreating(false);
    } catch (error) {
      console.error(error);
      setCreating(false);
    } finally {
      setCreating(false);
    }
  };

  const onSignUp = handleSubmit(
    async (values: z.infer<typeof SignUpSchema>) =>
      await signUp(values.email, values.password)
  );

  return {
    register,
    fieldsErrors,
    creating,
    reset,
    onSignUp,
    errors: [],
  };
};
