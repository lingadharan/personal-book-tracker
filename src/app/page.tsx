'use client';
import MainContent from '@/components/contents/mainContent';
import Header from '@/components/header';
import Tags from '@/components/tags';
import { useBookContext } from '@/context/bookContext';
import { useEffect } from 'react';

export default function Home() {
  const context = useBookContext();
  const { selectedTag, setSelectedTag, setAllBookDetails } = context;
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        if (selectedTag !== 'dashboard') return;
        const response = await fetch('http://localhost:5000/api');
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
  return (
    <div className="min-h-full flex flex-col bg-amber-100">
      <header>
        <Header />
      </header>
      <Tags setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
      <MainContent selectedTag={selectedTag} />
    </div>
  );
}
