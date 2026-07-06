import { Book, SelectedTag } from "@/types/interfaces";
import { FAVOURITE_BOOK_CONTENT_HEAD, INTEREST_BOOK_CONTENT_HEAD, MOCK_BOOKS, READ_CONTENT_HEAD, READING_CONTENT_HEAD } from "@/utiles/constants"
import { JSX } from "react/jsx-runtime";

function ReadingRows({ books }: { books: Book[] }) {
  return (
    <>
      {books.map((book, index) => (
        <tr key={book.id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.currentPage ?? 0}</td>
        </tr>
      ))}
    </>
  );
}

function ReadRows({ books }: { books: Book[] }) {
  return (
    <>
      {books.map((book, index) => (
        <tr key={book.id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.durationToComplete ?? "N/A"}</td>
          <td className="p-2 text-left">{book.notes ?? ""}</td>
        </tr>
      ))}
    </>
  );
}

function InterestRows({ books }: { books: Book[] }) {
  return (
    <>
      {books.map((book, index) => (
        <tr key={book.id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.suggestedBy ?? "Unknown"}</td>
          <td className="p-2 text-left">{book.notes ?? ""}</td>
        </tr>
      ))}
    </>
  );
}

function FavouriteRows({ books }: { books: Book[] }) {
  return (
    <>
      {books.map((book, index) => (
        <tr key={book.id} className="text-center border-b">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{book.title}</td>
          <td className="p-2">{book.author}</td>
          <td className="p-2">{book.readStatus ?? "Plan to Read"}</td>
          <td className="p-2 text-left">{book.notes ?? ""}</td>
        </tr>
      ))}
    </>
  );
}

export default function Table({ selectedTag }: { selectedTag: SelectedTag }) {

  if (selectedTag === 'dashboard') {
    return null
  }

  const tableHeadMap = {
    reading: READING_CONTENT_HEAD,
    read: READ_CONTENT_HEAD,
    interest: INTEREST_BOOK_CONTENT_HEAD,
    favourite: FAVOURITE_BOOK_CONTENT_HEAD,
  };

  const tableHead = tableHeadMap[selectedTag]

  const tableBody = MOCK_BOOKS.filter((book) => book.category === selectedTag)

  const tableBodyData = (): JSX.Element => {
    switch (selectedTag) {
      case "reading":
        return <ReadingRows books={tableBody} />
      case "read":
        return <ReadRows books={tableBody} />
      case "interest":
        return <InterestRows books={tableBody} />
      case "favourite":
        return <FavouriteRows books={tableBody} />
      default:
        return <></>
    }
  }

  return (
    <table className=" w-full">
      <thead>
        <tr>
          {tableHead.map((head) => <th key={head}>{head}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          tableBodyData()
        }
      </tbody>
    </table>
  )
}


