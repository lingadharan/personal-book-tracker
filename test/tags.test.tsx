import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Tags from '@/components/tags';
import { TAG_CONSTANTS } from '@/utiles/constants';

const mockSetSelectedTag = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Tags Component', () => {
  it('renders all tags and highlights the selected tag', () => {
    render(
      <Tags setSelectedTag={mockSetSelectedTag} selectedTag="dashboard" />
    );

    TAG_CONSTANTS.forEach((tag) => {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /dashboard/i })).toHaveClass(
      'font-semibold'
    );
  });

  it('calls setSelectedTag when a tag is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Tags setSelectedTag={mockSetSelectedTag} selectedTag="dashboard" />
    );

    await user.click(screen.getByRole('button', { name: /reading/i }));

    expect(mockSetSelectedTag).toHaveBeenCalledWith('reading');
    expect(mockSetSelectedTag).toHaveBeenCalledTimes(1);
  });
});
