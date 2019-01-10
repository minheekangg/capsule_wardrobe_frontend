import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from './components/LandingPage'
import Market from './components/Market'
import Closet from './components/Closet'




ReactDOM.render(
    <Provider store={store}>
    <Router>
        <>
        <Route exact path='/welcome' component={LandingPage} />
        <Route exact path='/' component={App} />
        <Route exact path='/Closet' component={Closet} />
        <Route exact path='/Market' component={Market} />
        </>
    </Router>
  </Provider>,
  document.getElementById("root")
);
 
serviceWorker.unregister();
