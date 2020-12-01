import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Components/Book'

export default function SearchBooks({searchAPI}) {

    const [query, setQuery] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const updateQueryHandler = (searchQuery) => {
      setQuery(searchQuery.trim())
      searchAPI(query, 20).then((res) => {
          if(Object.prototype.toString.call(res) === '[object Array]')
          {
            setSearchedBooks(res)
          }
          else{
            setSearchedBooks([])
          }
        })
      
    }
    const clearQueryHandler = () => {
        updateQueryHandler('')
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search" onClick={() => {clearQueryHandler()}}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search..." onEmptied={() => {clearQueryHandler()}} onChange={(e) => {updateQueryHandler(e.target.value)}} value={query}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {query !== '' && searchedBooks.map((book) => (
                <li key={book.id}>
                    <Book title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail}/>
                </li>
              ))}
              </ol>
            </div>
          </div>
    )
}
