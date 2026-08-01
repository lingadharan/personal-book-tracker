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
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

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
  }, [selectedTag, setAllBookDetails, isAuthenticated, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading) {
    return <p>Loading... Dashboard!!!</p>;
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
