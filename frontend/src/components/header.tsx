'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { env } from '@/utiles/env';

interface User {
  name: string;
  email: string;
  avatar?: string;
  provider: string;
}

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${env.backendURL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        router.push('/login');
        window.location.reload();
      } else {
        console.error('Logout failed on the server');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={100}
          height={20}
          priority
        />

        <h1 className="text-center text-2xl font-bold text-amber-900 sm:text-left sm:text-3xl lg:text-4xl">
          Personal Book Tracker
        </h1>
      </div>

      <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end sm:gap-4">
        <Link
          href="/new-book"
          className="text-sm font-medium text-amber-800 transition-colors hover:text-amber-950 sm:text-base"
        >
          New Book
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 rounded-full border border-amber-300 p-1.5 transition-all hover:bg-amber-200 focus:outline-none"
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white sm:h-10 sm:w-10">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-100 bg-white p-4 shadow-lg sm:w-64">
                <div className="flex flex-col items-center text-center">
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="mb-2 h-14 w-14 rounded-full border border-slate-200 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <h3 className="text-base font-bold text-slate-800">
                    {user.name}
                  </h3>

                  <p className="mb-2 break-all text-xs text-slate-500">
                    {user.email}
                  </p>

                  <div className="my-2 w-full border-t border-slate-100 pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-colors duration-150 hover:bg-red-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded border border-amber-300 bg-amber-200 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-300 sm:text-base"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
