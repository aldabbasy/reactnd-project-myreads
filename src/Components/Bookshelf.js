import React from 'react'
import Book from './Book'
import * as CallingAPI from '../Services/BooksAPI'
export default function Bookshelf({ allBooks, setBooks, books, title}) {

	const handleSelectChange = (book, shelf) => {
		if(book)
		{
		  if(shelf !== book.shelf)
		  {
			CallingAPI.update(book, shelf).then((res) => {
				let _removeBook = allBooks.filter((b) => {
					return b.id !== book.id
				})
				CallingAPI.get(book.id).then((res) => {
					_removeBook.push(res)
					setBooks(_removeBook)
				})
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
								<Book book={book} updateAPI={handleSelectChange} />
							</li>
						))}
					</ol>
				</div>
			</div>
    )
}
