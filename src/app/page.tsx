'use client';
import MainContent from '@/components/contents/mainContent';
import Header from '@/components/header';
import Tags from '@/components/tags';
import { GlobalBookContext } from '@/context/bookContext';
import { Book, SelectedTag } from '@/types/interfaces';
import { useState, useEffect, useContext } from 'react';

export default function Home() {
  const context = useContext(GlobalBookContext);
  if (!context) {
    return (
      <p>
        Error: GlobalBookContext must be used within a GlobalBookContextProvider
      </p>
    );
  }
  const { selectedTag, setSelectedTag } = context;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        if (selectedTag !== 'dashboard') return;
        const response = await fetch('http://localhost:5000/api');
        const result = await response.json();
        if (result.data) {
          context.setAllBookDetails(result.data);
        }
      } catch (error) {
        console.error('Failed fetching data from Node backend:', error);
      } finally {
        setLoading(false);
      }
    };
    getBookDetails();
  }, [selectedTag]);
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
