import SignUpForm from '@/components/forms/sign-up';

const SignUpPage = () => {
  return (
    <>
      <h5 className='font-bold text-lg text-themeTextWhite mb-2'>Signup</h5>
      <p className='text-themeTextGray leading-tight'>
        Network with people from around africa, join groups, watch courses
        taught by the best and become one of the best in your field.
      </p>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
