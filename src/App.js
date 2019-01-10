import React, { Component } from 'react';
import './App.css';
// import LandingPage from './components/LandingPage'
import { Link } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <Link to="/welcome"> Welcome! </Link>
      </div>
    );
  }
}

export default App;
