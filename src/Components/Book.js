import React from 'react'

export default function Book({updateAPI, book}) {

	const handleSelectChange = (shelf) => {
		if(book)
		{
			updateAPI(book, shelf)
		}
	}

    return (
	<div className="book">
		<div className="book-top">
			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${"imageLinks" in book ? (book.imageLinks.thumbnail || '') : ''}")` }}></div>
			<div className="book-shelf-changer">
				<select value={book.shelf || 'none'} onChange={(e) => {handleSelectChange(e.target.value)}}>
					<option value="move" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		</div>
		<div className="book-title">{book.title || "Default title"}</div>
		<div className="book-authors">{book.authors || "Unknown authors"}</div>
	</div>
    )
}
