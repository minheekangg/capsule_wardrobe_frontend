import React, { Component } from 'react';
import './App.css';
import Cloudinary from './Components/Cloudinary';

// const API_KEY = `${process.env.REACT_APP_MY_CLOUD_NAME}`;
console.log(process.env.REACT_APP_MY_CLOUD_NAME);
class App extends Component {
  render() {
    return (
      <div className="App">
     <Cloudinary/>
      </div>
    );
  }
}

export default App;
