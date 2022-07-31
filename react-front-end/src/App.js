
// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Components, styles, media
import './App.css';
import Navigation from './components/Navigation';

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
          <p>Insert short, catchy slogan.</p>
        </header>
        <Navigation />
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
        <footer>
          <p><cite>&copy; 2022 Doug Leedke</cite></p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
