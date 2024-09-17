import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import GlassSheet from '@/components/global/glass-sheet';
import SignInButton from './signin-button';
import Menu from './menu';

import getCurrentUser from '@/actions/auth/get-current-user';
import { CurrentUser } from '@/types';

const LandingPageNavbar = async () => {
  const currentUser: CurrentUser = await getCurrentUser();

  return (
    <div className='w-full flex justify-between sticky top-0 items-center py-5 z-50'>
      <p className='font-bold text-2xl'>Masterclass Africa.</p>
      <Menu orientation='desktop' />
      <div className='flex gap-2'>
        <SignInButton currentUser={currentUser} />
        <GlassSheet
          triggerClass='lg:hidden'
          trigger={
            <Button variant='ghost' className='hover:bg-transparent'>
              <MenuIcon size={30} />
            </Button>
          }
        >
          <Menu orientation='mobile' />
        </GlassSheet>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
