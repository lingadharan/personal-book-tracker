'use client';
import { env } from '@/utiles/env';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import GoogleIcon from '@/utiles/svg/googleIcon';
import Loader from '@/ui/loader';

function LoginContent() {
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const error = searchParams.get('error');

  const handleGoogleLogin = () => {
    window.location.href = `${env.backendURL}/auth/google`;
  };

  useEffect(() => {
    if (isLoading) return;
    if (user || isAuthenticated) {
      router.replace('/');
    }
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-primary-200 bg-white p-6 shadow-lg sm:p-8">
        <div className=" mb-8 flex flex-col items-center text-center">
          <Image
            src="/personal-book-tracker.svg"
            alt="personal book tracker Logo"
            className="mb-4"
            width={100}
            height={100}
            priority
          />

          <h1 className="text-3xl font-bold text-primary-900">Welcome Back</h1>

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
        bg-primary-600
        px-5
        py-3
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-primary-700
        hover:shadow-md
        active:scale-[0.98]
      "
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function LoginComponent() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginContent />
    </Suspense>
  );
}
