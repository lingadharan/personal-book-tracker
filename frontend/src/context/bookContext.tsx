'use client';
import { Book, SelectedTag } from '@/types/interfaces';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface IGlobalBookContext {
  allBookDetails: Book[];
  setAllBookDetails: (books: Book[]) => void;
  selectedTag: SelectedTag;
  setSelectedTag: (tag: SelectedTag) => void;
}

export const GlobalBookContext = createContext<IGlobalBookContext | null>(null);

export function GlobalBookContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [allBookDetails, setAllBookDetails] = useState<Book[]>([]);
  const [selectedTag, setSelectedTag] = useState<SelectedTag>('Overview');
  return (
    <GlobalBookContext.Provider
      value={{
        allBookDetails: allBookDetails,
        setAllBookDetails: setAllBookDetails,
        selectedTag: selectedTag,
        setSelectedTag: setSelectedTag,
      }}
    >
      {children}
    </GlobalBookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(GlobalBookContext);
  if (!context) {
    throw new Error(
      'useBookContext must be used within a GlobalBookContextProvider'
    );
  }
  return context;
}
