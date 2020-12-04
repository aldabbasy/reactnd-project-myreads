import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Components/Book'
import * as CallingAPI from '../Services/BooksAPI'
export default function SearchBooks({setBooks, allBooks}) {

    const [query, setQuery] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [verifiedBooks, setVerifiedBooks] = useState([]);
    const [isEmptyOrError, setIsEmptyOrError] = useState(false);
    const updateQueryHandler = (searchQuery) => {
      try{
        setQuery(searchQuery)
       CallingAPI.search(searchQuery, 20).then((res) => {
          if(Object.prototype.toString.call(res) === '[object Array]')
          {
            setSearchedBooks(res)
          }
          else{
            setSearchedBooks([])
          }

          
          if(searchedBooks.length > 0)
          {
            setVerifiedBooks(searchedBooks.map(book => {
              allBooks.forEach(bookOnShelf => {
                if(book.id === bookOnShelf.id)
                {
                  book.shelf = bookOnShelf.shelf
                }
              })
              return book
            }))
            setIsEmptyOrError(false)
          }
          else{
            setIsEmptyOrError(true)
            setVerifiedBooks([])
          }
        })
      }
      catch{
        setIsEmptyOrError(true)
        setSearchedBooks([])
        setVerifiedBooks([])
      }
    }

    const handleSelectChange = (book, shelf) => {
      if(book)
      {
        CallingAPI.update(book, shelf).then((res) => {
          if(shelf !== 'none')
          {
            setSearchedBooks(
              searchedBooks.filter((b) => {
                return b.id !== book.id
              })
            )
            let _removeBook = allBooks.filter((b) => {
              return b.id !== book.id
            })
            book.shelf = shelf
            _removeBook.push(book)
            setBooks(_removeBook)
          }
        })
      }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search" onClick={() => {setQuery('')}}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search..." onEmptied={() => {setQuery('')}} onChange={(e) => {updateQueryHandler(e.target.value)}} value={query}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {query !== '' && verifiedBooks.map((book) => (
                <li key={book.id}>
                    <Book updateAPI={handleSelectChange} book={book} />
                </li>
              ))}
              {isEmptyOrError && (
                <li>
                    <h3>we are sorry, your book is not in our library.</h3>
                    <p>come back again later you might find your book </p>
                    <p>Ps: we dont collect your search data, its just magic *wink*</p>
                </li>
              )}
              </ol>
            </div>
          </div>
    )
}
