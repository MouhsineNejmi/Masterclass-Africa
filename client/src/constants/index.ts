import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from './forms';

type MasterclassAfricaConstantsProps = {
  signUpForm: AuthFormProps[];
  signInForm: AuthFormProps[];
};

export const MASTERCLASS_AFRICA_CONSTANTS: MasterclassAfricaConstantsProps = {
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
};
