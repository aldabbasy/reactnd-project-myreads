import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import MyReads from '../Screens/MyReads'
import SearchBooks from '../Screens/SearchBooks'
import * as CallingAPI from '../Services/BooksAPI'
import './App.css'
export default function App() {
  
  const [books, setBooks] = useState([])

  useEffect(() => {
    CallingAPI.getAll().then((res) => {
      if(Object.prototype.toString.call(res) === '[object Array]')
      {
        setBooks(res)
      }
      else{
        setBooks([])
      }
    })
  }, []);

  return (
    <div className="app">
      <Route exact path='/' render={() => (
          <MyReads getBook={CallingAPI.get} setBooks={setBooks} books={books} updateAPI={CallingAPI.update} />
        )} />
      <Route path='/Search' render={() => (
        <SearchBooks allBooks={books} setBooks={setBooks} updateAPI={CallingAPI.update} searchAPI={CallingAPI.search}/>
        )} />
    </div>
  )
}

