import React from 'react';
import './App.css';
import HomePage from './pages/homepage.component';
import {Route} from 'react-router-dom';


const Hats=()=> (
  <h1>Hats Page</h1>
)

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hats' component={Hats} />
    </div>
  );
}

export default App;
