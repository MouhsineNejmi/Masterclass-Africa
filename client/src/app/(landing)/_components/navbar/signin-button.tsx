'use client';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CurrentUser } from '@/types';
import { useAuthSignOut } from '@/hooks/authentication';
import { Loader } from '@/components/global/loader';
import { useRouter } from 'next/navigation';

type Props = {
  currentUser: CurrentUser;
};

const SignInButton = ({ currentUser }: Props) => {
  const router = useRouter();
  const { isPending, handleSignOut } = useAuthSignOut();

  const handleLogout = async () => {
    currentUser ? await handleSignOut() : router.push('/sign-in');
  };

  return (
    <Button
      variant='outline'
      className='bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray'
      onClick={handleLogout}
      disabled={isPending}
    >
      <LogOut className={cn(currentUser ? '-rotate-180' : '')} />
      <Loader loading={isPending}>
        {currentUser ? 'Sign out' : 'Sign In/Up'}
      </Loader>
    </Button>
  );
};

export default SignInButton;
