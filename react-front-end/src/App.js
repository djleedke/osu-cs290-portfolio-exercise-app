
// Import dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Components, styles, media
import './App.css';
import Navigation from './components/Navigation';
import randomQuote from './RandomQuote';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';


function App() {

  const [exercise, setExercise] = useState([]);
  const [quote, setQuote] = useState(randomQuote());

  useEffect(()=>{
    setQuote(randomQuote);
  }); 

  return (
      <div className="App">
        <Router>
          <header>
            <h1>Beavercise App</h1>
            <p className="motivational-quote">{quote}</p>
          </header>
          <Navigation />
          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise}/>
            </Route>
            
            <Route path="/create">
              <CreatePage />
            </Route>

            <Route path="/edit-exercise">
              <EditPage exercise={exercise}/>
            </Route>
          </main>
        </Router>
        <footer>
          <p><cite>&copy; 2022 Doug Leedke</cite></p>
        </footer>
      </div>
  );
}

export default App;
