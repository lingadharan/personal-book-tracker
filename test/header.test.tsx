import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/header';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('location', {
      ...window.location,
      reload: vi.fn(),
    });
  });

  it('renders header title and navigation links when user is not logged in', () => {
    render(<Header user={null} />);

    expect(
      screen.getByRole('heading', {
        name: /personal book tracker/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /new book/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders user avatar button and hides Sign In when user is logged in', () => {
    render(
      <Header
        user={{
          name: 'Lingadharan',
          email: 'linga@test.com',
          provider: 'google',
        }}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /sign in/i })
    ).not.toBeInTheDocument();
  });

  it('shows user information when avatar button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Header
        user={{
          name: 'Lingadharan',
          email: 'linga@test.com',
          provider: 'google',
        }}
      />
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Lingadharan')).toBeInTheDocument();

    expect(screen.getByText('linga@test.com')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /log out/i,
      })
    ).toBeInTheDocument();
  });

  it('logs out successfully and redirects to login page', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
    } as Response);

    render(
      <Header
        user={{
          name: 'Lingadharan',
          email: 'linga@test.com',
          provider: 'google',
        }}
      />
    );

    await user.click(screen.getByRole('button'));
    await user.click(
      screen.getByRole('button', {
        name: /log out/i,
      })
    );

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/logout',
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
