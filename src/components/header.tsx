'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      const response = await fetch('http://localhost:5000/api/auth/logout', {
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
    <div className="flex justify-between items-center gap-3 p-4 bg-amber-50 shadow-sm relative">
      <Image src="/next.svg" alt="Next.js Logo" width={100} height={20} />
      <h1 className="font-bold text-4xl text-amber-900">
        Personal Book Tracker
      </h1>

      <div className="flex items-center gap-4">
        <Link
          href={'/new-book'}
          className="text-amber-800 hover:text-amber-950 font-medium text-sm transition-colors"
        >
          New Book
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-amber-200 transition-all border border-amber-300 focus:outline-none"
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 p-4 z-50">
                <div className="flex flex-col items-center text-center">
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      alt=""
                      className="w-14 h-14 rounded-full mb-2 border border-slate-200 object-cover"
                      referrerPolicy="no-referrer"
                      width={56}
                      height={56}
                    />
                  )}
                  <h3 className="font-bold text-slate-800 text-base">
                    {user.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{user.email}</p>

                  <div className="w-full border-t border-slate-100 my-2 pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm rounded-lg transition-colors duration-150"
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
            href={'/login'}
            className="p-2 bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 transition-colors text-black font-semibold text-sm flex items-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
