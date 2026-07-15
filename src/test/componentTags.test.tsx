import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tags from '@/components/tags';
import { TAG_CONSTANTS } from '@/utiles/constants';

const mockSetSelectedTag = vi.fn();

describe('Tags Component', () => {
  it('Check whether all the tags are presents in the page.', () => {
    render(
      <Tags setSelectedTag={mockSetSelectedTag} selectedTag="dashboard" />
    );

    TAG_CONSTANTS.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    const selectedTag = screen.getByText('dashboard');
    expect(selectedTag.className).toContain('font-bold');
  });

  it('Check if the user clicks one of the tag, than tag becomes bolder', async () => {
    render(
      <Tags setSelectedTag={mockSetSelectedTag} selectedTag="dashboard" />
    );
    const user = userEvent.setup();
    const element = screen.getByText(/reading/i);
    await user.click(element);
    expect(mockSetSelectedTag).toHaveBeenCalledWith('reading');
  });
});
