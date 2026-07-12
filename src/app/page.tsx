'use client';
import MainContent from '@/components/contents/mainContent';
import Header from '@/components/header';
import Tags from '@/components/tags';
import { useBookContext } from '@/context/bookContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const context = useBookContext();
  const { selectedTag, setSelectedTag, setAllBookDetails } = context;
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (data.isAuthenticated) {
          setCurrentUser(data.user);
          setIsCheckingAuth(false);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    if (isCheckingAuth) return;

    const getBookDetails = async () => {
      try {
        if (selectedTag !== 'dashboard') return;
        const response = await fetch('http://localhost:5000/api', {
          credentials: 'include',
        });
        const result = await response.json();
        if (result.data) {
          setAllBookDetails(result.data);
        }
      } catch (error) {
        console.error('Failed fetching data from Node backend:', error);
      }
    };
    getBookDetails();
  }, [selectedTag, setAllBookDetails, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-amber-100 flex flex-col items-center justify-center font-medium text-amber-900">
        Checking secure session...
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-amber-100">
      <header>
        <Header user={currentUser} />
      </header>
      <Tags setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
      <MainContent selectedTag={selectedTag} />
    </div>
  );
}
