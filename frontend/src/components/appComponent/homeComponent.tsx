'use client';
import MainContent from '@/components/contents/mainContent';
import Header from '@/components/header';
import Tags from '@/components/tags';
import { useBookContext } from '@/context/bookContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { env } from '@/utiles/env';
import { useAuth } from '@/context/authContext';

export default function HomeComponent() {
  const context = useBookContext();
  const { selectedTag, setSelectedTag, setAllBookDetails } = context;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  console.log('ISAUTH: ', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const getBookDetails = async () => {
      try {
        if (selectedTag !== 'dashboard') return;
        const response = await fetch(`${env.backendURL}/get-book`, {
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
  }, [selectedTag, setAllBookDetails]);

  if (!isAuthenticated) {
    router.replace('/login');
  }

  return (
    <div className="min-h-full flex flex-col bg-amber-100">
      <header>
        <Header user={user} />
      </header>
      <Tags setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
      <MainContent selectedTag={selectedTag} />
    </div>
  );
}
