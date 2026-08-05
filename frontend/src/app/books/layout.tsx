'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading) {
    return <p>Loading... Books!!!</p>;
  }
  return <>{children}</>;
}
