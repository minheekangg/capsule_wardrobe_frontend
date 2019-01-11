import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';

import LandingPage from './components/LandingPage'
import Market from './components/Market'
import Closet from './components/Closet'
import Nav from './components/nav'
import Login from './components/login'

class App extends Component {
  // <Route component={NotFound} />
  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/welcome" />} />
          <Route exact path="/welcome" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/closet" component={Closet} />
          <Route exact path="/market" component={Market} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
