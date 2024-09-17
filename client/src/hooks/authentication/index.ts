'use client';

import clientAxios from '@/axios/axios-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

import { SignUpSchema, SignInSchema } from '@/schemas/auth';

export const useAuthSignIn = () => {
  const {
    register,
    formState: { errors: fieldsErrors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
  });

  const router = useRouter();

  const { mutate: SignIn, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await clientAxios.post('/api/users/signin', { email, password });
    },
    onSuccess: () => {
      reset();
      router.push('/');
    },
    onError: (error) => {
      console.error('ERROR SIGNIN: ', error);
    },
  });

  const signIn = async (email: string, password: string) => {
    try {
      SignIn({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onAuthenticateUser = handleSubmit(
    async (values) => await signIn(values.email, values.password)
  );

  return {
    onAuthenticateUser,
    isPending,
    register,
    fieldsErrors,
    errors: [],
  };
};

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
      console.error('ERROR SIGN UP: ', error);
    },
    onSuccess: () => {
      reset();
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

export const useAuthSignOut = () => {
  const router = useRouter();
  const { mutate: SignOut, isPending } = useMutation({
    mutationFn: async () => {
      return await clientAxios.post('/api/users/signout');
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.log('Signout Error: ', error);
    },
  });

  const handleSignOut = async () => SignOut();

  return { isPending, handleSignOut };
};
