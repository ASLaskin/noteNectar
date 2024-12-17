import { useSession } from 'next-auth/react';

const useIsLoggedIn = () => {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return session;
  }
  //Add redirect here if needed
  return false;
};

export { useIsLoggedIn };

