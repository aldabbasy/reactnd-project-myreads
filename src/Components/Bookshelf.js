import React from 'react'
import Book from './Book'
export default function Bookshelf({getBook, allBooks, setBooks, books, updateAPI, title}) {

	const handleSelectChange = (book, shelf) => {
		if(book)
		{
		  if(shelf !== book.shelf)
		  {
			updateAPI(book, shelf)
			let _removeBook = allBooks.filter((b) => {
				return b.id !== book.id
			})
			getBook(book.id).then((res) => {
				_removeBook.push(res)
				setBooks(_removeBook)
			})
			
		  }
		}
	  }

    return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<Book book={book} updateAPI={handleSelectChange} title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail}/>
							</li>
						))}
					</ol>
				</div>
			</div>
    )
}
