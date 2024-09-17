'use client';

import { MASTERCLASS_AFRICA_CONSTANTS } from '@/constants';
import { FormGenerator } from '@/components/forms/form-generator';
import { Loader } from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { useAuthSignUp } from '@/hooks/authentication';

const SignUpForm = () => {
  const { register, fieldsErrors, creating, onSignUp } = useAuthSignUp();

  return (
    <form onSubmit={onSignUp} className='flex flex-col gap-3 mt-10'>
      {MASTERCLASS_AFRICA_CONSTANTS.signUpForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={fieldsErrors}
        />
      ))}

      <Button type='button' className='rounded-2xl' onClick={onSignUp}>
        <Loader loading={creating}>Sign Up</Loader>
      </Button>
    </form>
  );
};

export default SignUpForm;
