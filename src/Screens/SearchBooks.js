import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Components/Book'

export default function SearchBooks({setBooks, allBooks, updateAPI, searchAPI}) {

    const [query, setQuery] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const updateQueryHandler = (searchQuery) => {
      
       setQuery(searchQuery.trim())
       searchAPI(searchQuery.trim(), 20).then((res) => {
          if(Object.prototype.toString.call(res) === '[object Array]')
          {
            setSearchedBooks(res)
          }
          else{
            setSearchedBooks([])
          }
        })
      
    }

    const handleSelectChange = (book, shelf) => {
      if(book)
      {
        updateAPI(book, shelf)
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
              {query !== '' && searchedBooks.map((book) => (
                <li key={book.id}>
                    <Book updateAPI={handleSelectChange} book={book} title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail}/>
                </li>
              ))}
              </ol>
            </div>
          </div>
    )
}
