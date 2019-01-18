import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';

import Welcome from './components/welcome'
import Market from './components/Market'
import Closet from './components/Closet'
import NavBar from './components/nav'
import Login from './components/login'
import Cloudinary from './components/Cloudinary'
import Outfit from './components/Outfit'
import signUp from './components/signUp'
import Listing from './components/Listing'
import Donate from './components/Donate'

class App extends Component {
  // <Route component={NotFound} />
  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/welcome" />} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/closet" component={Closet} />
          <Route exact path="/market" component={Market} />
          <Route exact path="/additem" component={Cloudinary} />
          <Route exact path="/outfits" component={Outfit} />
          <Route exact path="/signup" component={signUp} />
          <Route exact path="/listing" component={Listing} />
          <Route exact path="/donate" component={Donate} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
