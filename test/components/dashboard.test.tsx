import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { GlobalBookContext, IGlobalBookContext } from '@/context/bookContext';
import DashBoardContent from '@/components/contents/dashboardContent';

describe('DashBoardContent Component', () => {
  const mockContext: IGlobalBookContext = {
    allBookDetails: [
      {
        _id: '1',
        title: 'Atomic Habits',
        category: 'reading',
        author: '',
      },
      {
        _id: '2',
        title: 'Deep Work',
        category: 'read',
        author: '',
      },
      {
        _id: '3',
        title: 'Clean Code',
        category: 'interest',
        author: '',
      },
      {
        _id: '4',
        title: 'The Pragmatic Programmer',
        category: 'favourite',
        author: '',
      },
    ],
    setAllBookDetails: vi.fn(),
    selectedTag: 'reading',
    setSelectedTag: vi.fn(),
  };

  it('renders an error message when GlobalBookContext is not available', () => {
    render(<DashBoardContent />);

    expect(
      screen.getByText(
        /GlobalBookContext must be used within a GlobalBookContextProvider/i
      )
    ).toBeInTheDocument();
  });

  it('renders books under their respective categories', () => {
    render(
      <GlobalBookContext.Provider value={mockContext}>
        <DashBoardContent />
      </GlobalBookContext.Provider>
    );

    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Interesting Books')).toBeInTheDocument();
    expect(screen.getByText('Favourite Books')).toBeInTheDocument();

    expect(screen.getByText('Atomic Habits')).toBeInTheDocument();
    expect(screen.getByText('Deep Work')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('The Pragmatic Programmer')).toBeInTheDocument();
  });
});
