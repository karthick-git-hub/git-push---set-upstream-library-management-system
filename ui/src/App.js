import React from 'react';
import './App.css';
import BookManager from './BookManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Management System</h1>
      </header>
      <main>
        <BookManager />
      </main>
    </div>
  );
}

export default App;
