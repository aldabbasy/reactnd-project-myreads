import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../Components/Bookshelf'
export default function MyReads() {
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                <Bookshelf />
            </div>
            </div>
            <div className="open-search">
              <Link to='/Search'>Add a book</Link>
            </div>
        </div>
    )
}
