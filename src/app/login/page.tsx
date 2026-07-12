'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h1>
        <p className="text-sm text-slate-500 mb-6">
          Please sign in to access your library
        </p>

        {error === 'auth_failed' && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
            Authentication failed. Please try logging in again.
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
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
