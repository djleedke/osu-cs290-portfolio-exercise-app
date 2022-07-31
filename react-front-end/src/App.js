
// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Components, styles, media
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <h1>Exercise App</h1>
        </header>
        <main>
          <Route path="/" exact>
            <HomePage />
          </Route>
          
          <Route path="/create">
            <CreatePage />
          </Route>

          <Route path="/edit">
            <EditPage />
          </Route>
        </main>
      </Router>
    </div>
  );
}

export default App;
