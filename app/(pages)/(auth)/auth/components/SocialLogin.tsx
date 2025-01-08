import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import Loading from '@/components/ui/Loading';
import { useAuth } from '../hooks/useAuth';

const SocialLogin = () => {
  const { loadingGoogle, loadingFacebook, socialActions } = useAuth();

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <button
        className="flex items-center justify-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        onClick={() => socialActions('google')}
      >
        {loadingGoogle ? <Loading className="mr-2" /> : <FcGoogle size={20} className="mr-2" />}
        Continue with Google
      </button>

      <button
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
        onClick={() => socialActions('facebook')}
      >
        {loadingFacebook ? (
          <Loading />
        ) : (
          <FaFacebook className="mr-2" size={20} color="#1877F2" />
        )}
        Continue with Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
