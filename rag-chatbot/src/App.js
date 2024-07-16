import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
