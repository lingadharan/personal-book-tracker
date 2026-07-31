'use client';
import { env } from '@/utiles/env';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import { useAuth } from '@/context/authContext';

function LoginContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const error = searchParams.get('error');

  const handleGoogleLogin = () => {
    window.location.href = `${env.backendURL}/auth/google`;
  };

  if (isAuthenticated) {
    router.replace('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-lg sm:p-8">
        <div className=" mb-8 flex flex-col items-center text-center">
          <Image
            src="/personal-book-tracker.svg"
            alt="personal book tracker Logo"
            className="mb-4"
            width={100}
            height={100}
            priority
          />

          <h1 className="text-3xl font-bold text-amber-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Sign in to continue managing your personal library.
          </p>
        </div>

        {error === 'auth_failed' && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            Authentication failed. Please try signing in again.
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-lg
        bg-amber-600
        px-5
        py-3
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-amber-700
        hover:shadow-md
        active:scale-[0.98]
      "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 7.1l6.2 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function LoginComponent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
