import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../Components/Bookshelf'
export default function MyReads({ setBooks, books}) {

  const [currentlyReading, setCurrentlyReading] = useState([])
  const [wantToRead, setWantToRead] = useState([])
  const [read, setRead] = useState([])
  

  useEffect(() => {

    const sortBooksIntoShelves = () =>{
      setCurrentlyReading(
        books.filter((b) => {
          return b.shelf === 'currentlyReading'
        })
      )
      setWantToRead(
        books.filter((b) => {
          return b.shelf === 'wantToRead'
        })
      )
      setRead(
        books.filter((b) => {
          return b.shelf === 'read'
        })
      )
    }

    sortBooksIntoShelves()
  }, [books]);

    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                <Bookshelf  allBooks={books} setBooks={setBooks} books={currentlyReading} title='Currently Reading' />
                <Bookshelf  allBooks={books} setBooks={setBooks} books={wantToRead} title='Want To Read' />
                <Bookshelf  allBooks={books} setBooks={setBooks} books={read} title='Read' />
            </div>
            </div>
            <div className="open-search">
              <Link to='/Search'>Add a book</Link>
            </div>
        </div>
    )
}
