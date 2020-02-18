import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import logo from './images/songsterr.png'

function App() {

  return (
    <div className="App">
      <img src={logo} className="logo"></img>
      <p>With <strong>Songsterr</strong> you can search through tablature of any song!</p>
      <p>Simply tap you favourite musician or song you want to play!</p>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </div>
  );
}

export default App;
