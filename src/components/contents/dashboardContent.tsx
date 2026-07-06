import { MOCK_BOOKS } from "@/utiles/constants"

export default function DashBoardContent() {
  const readBooksName = MOCK_BOOKS.filter((book) => book.category === 'read')
  const readingBooksName = MOCK_BOOKS.filter((book) => book.category === 'reading')
  const interestBookName = MOCK_BOOKS.filter((book) => book.category === 'interest')
  const favouriteBookName = MOCK_BOOKS.filter((book) => book.category === 'favourite')

  return (
    <div className=" w-full h-screen bg-amber-200 grid grid-cols-2 grid-rows-2 rounded-2xl gap-4 p-4">
      <div className=" flex flex-col h-full">
        <h3>Reading</h3>
        <ol className=" list-decimal list-inside flex-1 overflow-y-auto space-y-3 pr-[30px]">
          {
            readingBooksName.map((book) => {
              return <li key={book.id}>{book.title}</li>
            })
          }
        </ol>
      </div>
      <div className=" flex flex-col h-full">
        <h3>Read</h3>
        <ol className=" list-decimal list-inside flex-1 overflow-y-auto space-y-3">
          {
            readBooksName.map((book) => {
              return <li key={book.id}>{book.title}</li>
            })
          }
        </ol>
      </div>
      <div className=" flex flex-col h-full">
        <h3>Interesting Books</h3>
        <ol className=" list-decimal list-inside flex-1 overflow-y-auto space-y-3">
          {
            interestBookName.map((book) => {
              return <li key={book.id}>{book.title}</li>
            })
          }
        </ol >
      </div >
      <div className=" flex flex-col h-full">
        <h3>Favourite Books</h3>
        <ol className=" list-decimal list-inside flex-1 overflow-y-auto space-y-3">
          {
            favouriteBookName.map((book) => {
              return <li key={book.id}>{book.title}</li>
            })
          }
        </ol>
      </div >
    </div >
  )
}