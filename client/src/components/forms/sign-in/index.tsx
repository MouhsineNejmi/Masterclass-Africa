'use client';

import { MASTERCLASS_AFRICA_CONSTANTS } from '@/constants';
import { FormGenerator } from '@/components/forms/form-generator';
import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { useAuthSignIn } from '@/hooks/authentication';

const SignInForm = () => {
  const { isPending, onAuthenticateUser, register, fieldsErrors } =
    useAuthSignIn();

  return (
    <form className='flex flex-col gap-3 mt-10' onSubmit={onAuthenticateUser}>
      {MASTERCLASS_AFRICA_CONSTANTS.signInForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={fieldsErrors}
        />
      ))}
      <Button type='submit' className='rounded-2xl'>
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  );
};

export default SignInForm;
