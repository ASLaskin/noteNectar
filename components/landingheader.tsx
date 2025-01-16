'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const session = useIsLoggedIn();

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full py-4 px-6 md:px-16 lg:px-40 flex items-center justify-between bg-white/70 backdrop-blur-lg z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-gray-300' : ''
        }`}
    >
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center">
          <Image src="./logo.svg" alt='logo' width={60} height={60} />
        </Link>
        <nav className="md:flex space-x-6">
          <Link href="/pricing">
            <button className="text-gray-700 hover:text-indigo-600 transition duration-300">
              Pricing
            </button>
          </Link>
          <Link href="/help">
            <button className="text-gray-700 hover:text-indigo-600 transition duration-300">
              Help
            </button>
          </Link>
        </nav>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <Link href="/dashboard">
              <button className="hidden md:inline-block px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300">
                Workspace
              </button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                  <User className="h-5 w-5 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md py-2">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/auth?variant=login">
              <button className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/auth?variant=register">
              <button className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
