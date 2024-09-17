'use client';

import { useAuthSignOut } from '@/hooks/authentication';
import { useEffect } from 'react';

export default function Signout() {
  const { isPending, handleLogout } = useAuthSignOut();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <h3>{isPending ? 'Signing you out...' : 'Signed out successfully!'}</h3>
    </>
  );
}
