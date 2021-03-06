import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';

import Welcome from './Components/welcome'
import Market from './Components/Market'
import Closet from './Components/Closet'
import NavBar from './Components/nav'
import Login from './Components/login'
import Cloudinary from './Components/Cloudinary'
import Outfit from './Components/Outfit'
import signUp from './Components/signUp'
import Listing from './Components/Listing'
import Donate from './Components/Donate'
import Sell from './Components/Sell'

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
          <Route exact path="/sell" component={Sell} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
