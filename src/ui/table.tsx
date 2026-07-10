import { GlobalBookContext } from '@/context/bookContext';
import { Book, SelectedTag } from '@/types/interfaces';
import {
  FAVOURITE_BOOK_CONTENT_HEAD,
  INTEREST_BOOK_CONTENT_HEAD,
  READ_CONTENT_HEAD,
  READING_CONTENT_HEAD,
} from '@/utiles/constants';
import handleDeleteButton from '@/utiles/deleteBookDetails';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { JSX } from 'react/jsx-runtime';

function ReadingRows({
  books,
  setSelectedTag,
}: {
  books: Book[];
  setSelectedTag: (tag: SelectedTag) => void;
}) {
  const router = useRouter();
  return (
    <>
      {books.map((book, index) => (
        <tr key={book._id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.currentPage ?? 0}</td>
          <td className="p-2">
            <button
              onClick={() => {
                router.push(`/update-book?_id=${book._id}`);
              }}
            >
              Update
            </button>
            <button
              onClick={async () => {
                await handleDeleteButton(book._id);
                setSelectedTag('dashboard');
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

function ReadRows({
  books,
  setSelectedTag,
}: {
  books: Book[];
  setSelectedTag: (tag: SelectedTag) => void;
}) {
  const router = useRouter();
  return (
    <>
      {books.map((book, index) => (
        <tr key={book._id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.durationToComplete ?? 'N/A'}</td>
          <td className="p-2 text-left">{book.notes ?? ''}</td>
          <td className="p-2">
            <button
              onClick={() => {
                router.push(`/update-book?_id=${book._id}`);
              }}
            >
              Update
            </button>
            <button
              onClick={async () => {
                await handleDeleteButton(book._id);
                setSelectedTag('dashboard');
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

function InterestRows({
  books,
  setSelectedTag,
}: {
  books: Book[];
  setSelectedTag: (tag: SelectedTag) => void;
}) {
  const router = useRouter();
  return (
    <>
      {books.map((book, index) => (
        <tr key={book._id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.suggestedBy ?? 'Unknown'}</td>
          <td className="p-2 text-left">{book.notes ?? ''}</td>
          <td className="p-2">
            <button
              onClick={() => {
                router.push(`/update-book?_id=${book._id}`);
              }}
            >
              Update
            </button>
            <button
              onClick={async () => {
                await handleDeleteButton(book._id);
                setSelectedTag('dashboard');
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

function FavouriteRows({
  books,
  setSelectedTag,
}: {
  books: Book[];
  setSelectedTag: (tag: SelectedTag) => void;
}) {
  const router = useRouter();

  return (
    <>
      {books.map((book, index) => (
        <tr key={book._id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.readStatus ?? 'Plan to Read'}</td>
          <td className="p-2 text-left">{book.notes ?? ''}</td>
          <td className="p-2">
            <button
              onClick={() => {
                router.push(`/update-book?_id=${book._id}`);
              }}
            >
              Update
            </button>
            <button
              onClick={async () => {
                await handleDeleteButton(book._id);
                setSelectedTag('dashboard');
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function Table({ selectedTag }: { selectedTag: SelectedTag }) {
  const context = useContext(GlobalBookContext);
  if (selectedTag === 'dashboard') {
    return null;
  }

  if (!context) {
    return (
      <p>
        Error: GlobalBookContext must be used within a GlobalBookContextProvider
      </p>
    );
  }

  const tableHeadMap = {
    reading: READING_CONTENT_HEAD,
    read: READ_CONTENT_HEAD,
    interest: INTEREST_BOOK_CONTENT_HEAD,
    favourite: FAVOURITE_BOOK_CONTENT_HEAD,
  };

  const tableHead = tableHeadMap[selectedTag];

  const tableBody = context.allBookDetails.filter(
    (book) => book.category === selectedTag
  );

  const tableBodyData = (): JSX.Element => {
    switch (selectedTag) {
      case 'reading':
        return (
          <ReadingRows
            books={tableBody}
            setSelectedTag={context.setSelectedTag}
          />
        );
      case 'read':
        return (
          <ReadRows books={tableBody} setSelectedTag={context.setSelectedTag} />
        );
      case 'interest':
        return (
          <InterestRows
            books={tableBody}
            setSelectedTag={context.setSelectedTag}
          />
        );
      case 'favourite':
        return (
          <FavouriteRows
            books={tableBody}
            setSelectedTag={context.setSelectedTag}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <table className=" w-full">
      <thead>
        <tr>
          {tableHead.map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tableBodyData()}</tbody>
    </table>
  );
}
