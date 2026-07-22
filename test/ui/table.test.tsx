import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GlobalBookContext, IGlobalBookContext } from '@/context/bookContext';
import Table from '@/ui/table';

const mockPush = vi.fn();
const mockDelete = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/utiles/deleteBookDetails', () => ({
  default: (...args: unknown[]) => mockDelete(...args),
}));

describe('Table Component', () => {
  const mockContext: IGlobalBookContext = {
    allBookDetails: [
      {
        _id: '1',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'reading',
        currentPage: 120,
        notes: 'Excellent',
      },
    ],
    setSelectedTag: vi.fn(),
    setAllBookDetails: vi.fn(),
    selectedTag: 'reading',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns nothing when selectedTag is dashboard', () => {
    const { container } = render(<Table selectedTag="dashboard" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders an error message when GlobalBookContext is not available', () => {
    render(<Table selectedTag="reading" />);

    expect(
      screen.getByText(
        /GlobalBookContext must be used within a GlobalBookContextProvider/i
      )
    ).toBeInTheDocument();
  });

  it('renders the table with book details', () => {
    render(
      <GlobalBookContext.Provider value={mockContext}>
        <Table selectedTag="reading" />
      </GlobalBookContext.Provider>
    );

    expect(screen.getByText('Atomic Habits')).toBeInTheDocument();
    expect(screen.getByText('James Clear')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('Excellent')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('shows "No books found." when no books exist for the selected category', () => {
    render(
      <GlobalBookContext.Provider
        value={{
          ...mockContext,
          allBookDetails: [],
        }}
      >
        <Table selectedTag="reading" />
      </GlobalBookContext.Provider>
    );

    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });

  it('navigates to update page when Update button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <GlobalBookContext.Provider value={mockContext}>
        <Table selectedTag="reading" />
      </GlobalBookContext.Provider>
    );

    await user.click(screen.getByRole('button', { name: /update/i }));

    expect(mockPush).toHaveBeenCalledWith('/update-book?_id=1');
  });

  it('deletes the book and resets selected tag to dashboard', async () => {
    const user = userEvent.setup();

    mockDelete.mockResolvedValue(undefined);

    render(
      <GlobalBookContext.Provider value={mockContext}>
        <Table selectedTag="reading" />
      </GlobalBookContext.Provider>
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(mockDelete).toHaveBeenCalledWith('1');
    expect(mockContext.setSelectedTag).toHaveBeenCalledWith('dashboard');
  });
});
