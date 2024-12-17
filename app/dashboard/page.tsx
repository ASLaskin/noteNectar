'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  // Check if user is logged in | Add redirect logic if needed

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-orange-400 to-blue-700 bg-clip-text text-3xl font-extrabold text-transparent">
          Protected Page
        </h2>
        <p className="mt-4 text-gray-300">Welcome to the dashboard!</p>
        <button
          onClick={() => signOut()}
          className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Sign Out
        </button>
      </div>
    </div>
  );
}
