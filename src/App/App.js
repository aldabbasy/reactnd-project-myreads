import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import MyReads from '../Screens/MyReads'
import SearchBooks from '../Screens/SearchBooks'
import './App.css'
export default function App() {
  
  return (
    <div className="app">
      <Route exact path='/' render={() => (
          <MyReads/>
        )} />
      <Route path='/Search' render={() => (
        <SearchBooks />
        )} />
    </div>
  )
}

