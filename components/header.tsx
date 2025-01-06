'use client'

import Link from 'next/link'
import { useIsLoggedIn } from '../hooks/useIsLoggedIn'
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
import { signOut } from 'next-auth/react';

const Header = () => {
  const session = useIsLoggedIn();

  const handleLogout = () => {
    signOut({
      redirect: true, 
      callbackUrl: '/',
    });
  };

  return (
    <header className="absolute top-0 left-0 w-full py-4 px-6 flex items-center justify-between bg-transparent backdrop-blur-lg z-50">
      <div className="flex items-center">
        <Link href="/" className="mr-6">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        </Link>
        <Separator orientation="vertical" className="h-6 mr-6 bg-white/20" />
        <nav className="flex space-x-4">
          <Link href="/pricing">
            <button className="px-4 py-2 rounded-md text-white hover:text-sky-200 transition duration-300">
              Pricing
            </button>
          </Link>
          <Link href="/about">
            <button className="px-4 py-2 rounded-md text-white hover:text-sky-200 transition duration-300">
              About
            </button>
          </Link>
          <Link href="/help">
            <button className="px-4 py-2 rounded-md text-white hover:text-sky-200 transition duration-300">
              Help
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-md text-white bg-white/10 hover:bg-white/20 hover:text-sky-200 transition duration-300">
                Workspace
              </button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-300">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/90 text-gray-800">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/auth?variant=login">
              <button className="px-4 py-2 rounded-md text-white bg-white/10 hover:bg-white/20 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/auth?variant=register">
              <button className="px-4 py-2 rounded-md text-white border border-white/30 hover:bg-white/20 transition duration-300">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
