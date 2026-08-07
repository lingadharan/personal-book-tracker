'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { env } from '@/utiles/env';
import { useAuth } from '@/context/authContext';
import { TAG_CONSTANTS, TAG_PATHS } from '@/utiles/constants';
import PlusIcon from '@/utiles/svg/plusIcon';
import HamburgerIcon from '@/utiles/svg/hamburgerIcon';
import PBTLogo from '@/utiles/svg/PBTLogo';
import { ThemeSwitcher } from '@/ui/themeSwitcher';

export default function Header() {
  const { user } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = `${env.backendURL}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${env.backendURL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.replace('/login');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-primary-50 px-4 py-3 shadow-sm">
      <div
        className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-[1.02] hover:bg-primary-50"
        onClick={() => router.push('/')}
      >
        <PBTLogo />

        <h1 className="hidden text-3xl font-bold text-primary-900 transition-colors duration-200 group-hover:text-primary-700 lg:block">
          Personal Book Tracker
        </h1>
      </div>

      <div className="flex items-center justify-end gap-1 md:gap-2 lg:gap-4">
        <ThemeSwitcher />
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg p-2 transition hover:bg-primary-100"
              >
                <HamburgerIcon />
              </button>

              {showMenu && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-50
                    mt-2
                    w-60
                    max-w-[calc(100vw-1rem)]
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                    "
                >
                  {TAG_CONSTANTS.map((tag) => {
                    const active = pathname === TAG_PATHS[tag];

                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          router.push(TAG_PATHS[tag]);
                          setShowMenu(false);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          px-5
                          py-3
                          text-left
                          text-sm
                          transition-colors
                          hover:bg-primary-50

                          ${
                            active
                              ? 'bg-primary-100 font-semibold text-primary-900'
                              : 'text-slate-700'
                          }
                        `}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/new-book"
              className="rounded-lg p-2 text-primary-800 transition hover:bg-primary-100"
            >
              <span className="hidden md:inline font-semibold">New Book</span>
              <PlusIcon />
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="rounded-full border border-primary-300 p-1 transition hover:bg-primary-100"
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name ?? ''}
                    width={40}
                    height={40}
                    className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 font-bold text-white sm:h-10 sm:w-10">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border bg-white p-4 shadow-xl">
                  <div className="flex flex-col items-center">
                    {user.avatar && (
                      <Image
                        src={user.avatar}
                        alt={user.name ?? ''}
                        width={60}
                        height={60}
                        className="mb-3 rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <h3 className="font-bold">{user.name}</h3>

                    <p className="mb-4 break-all text-sm text-slate-500">
                      {user.email}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-lg bg-primary-50 py-2 font-semibold text-primary-600 hover:bg-primary-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            onClick={handleGoogleLogin}
            className="rounded bg-primary-200 px-4 py-2 font-semibold hover:bg-primary-300"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
