import { JSX } from 'react/jsx-runtime';
import DashBoardContent from './dashboardContent';
import FavouriteBookContent from './favouriteBookContent';
import InterestBookContent from './interestBookContent';
import ReadContent from './readContent';
import ReadingContent from './readingContent';
import { SelectedTag } from '@/types/interfaces';

export default function MainContent({
  selectedTag,
}: {
  selectedTag: SelectedTag;
}) {
  const selectedContent = (): JSX.Element => {
    switch (selectedTag) {
      case 'Overview':
        return <DashBoardContent />;
      case 'Currently Reading':
        return <ReadingContent selectedTag={selectedTag} />;
      case 'Completed Books':
        return <ReadContent selectedTag={selectedTag} />;
      case 'Wishlist':
        return <InterestBookContent selectedTag={selectedTag} />;
      case 'Favorite Books':
        return <FavouriteBookContent selectedTag={selectedTag} />;
      default:
        return <></>;
    }
  };
  return <div className=" p-3 min-h-screen">{selectedContent()}</div>;
}
