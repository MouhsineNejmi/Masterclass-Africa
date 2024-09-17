import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from './forms';
import { LANDING_PAGE_MENU, MenuProps } from './menu';

type MasterclassAfricaConstantsProps = {
  signUpForm: AuthFormProps[];
  signInForm: AuthFormProps[];
  landingPageMenu: MenuProps[];
};

export const MASTERCLASS_AFRICA_CONSTANTS: MasterclassAfricaConstantsProps = {
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  landingPageMenu: LANDING_PAGE_MENU,
};
