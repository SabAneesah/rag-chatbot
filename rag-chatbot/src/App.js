import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to My React App!</h1>
      <p>This is a simple React app running on VS Code.</p>
    </div>
  );
}

export default App;
