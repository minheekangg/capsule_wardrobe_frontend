import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { LoginUser, getLocation } from "../actions/userActions";
import '../App.css'
import {  FormGroup,  FormControl, Row, Col, HelpBlock } from "react-bootstrap";


class Login extends React.Component{
    state = {
        username: "",
        password: "",
        longitude: 0,
        latitude: 0
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLoginSubmit = (e) => { 
        e.preventDefault()
        this.props.LoginUser(this.state.username, this.state.password)
        this.setState({ username: "", password: "" });

        // GET CURRENT POSITION WITH GEOLOCATION
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          const success = (pos) => {
            this.props.getLocation(pos.coords.latitude, pos.coords.longitude)
          }
          const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          navigator.geolocation.getCurrentPosition(success, error, options);
          // 

    }


    renderLoginForm = () => {
        return <div>
            <Row className="show-grid">
              <Col xs={6} md={4} />
              <Col xs={6} md={4}>
                <form onSubmit={this.handleLoginSubmit} className="loginForm">
                    {this.props.failedLogin ? <HelpBlock>
                        {this.props.error}
                      </HelpBlock> : null}
                  <h2 className="loginHeader">CAPSULE WARDROBE</h2>
                  <FormControl.Feedback />
                  <FormGroup widths="equal" className="loginInput">
                    <FormControl type="text" label="Text" name="username" placeholder="Enter username" onChange={this.handleChange} value={this.state.username} style={{ color: "grey" }} />
                    <FormControl type="password" label="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                  </FormGroup>
                  <div className="loginbutton">
                    <Col md={6}>
                      <button
                        style={{
                          color: "#1D4306",
                          border: "none",
                          font: "inherit",
                          cursor: "pointer"
                        }}
                      >
                        Sign In
                      </button>
                    </Col>
                    <Col md={6}>
                      <a href="/signup" style={{ color: "#C95D2D", border: "none", font: "inherit", cursor: "pointer" }}>
                        Sign Up
                      </a>
                    </Col>
                  </div>
                </form>
              </Col>
              <Col xs={6} md={4} />
            </Row>
          </div>;
    }
    
    render(){
      console.log("IS LOGGED IN?", this.props.isLoggedIn)
        return this.props.isLoggedIn ? <Redirect to="/welcome" /> : this.renderLoginForm()
    }
}

const mapStateToProps = (state) => {
    return{
        authenticatingUser: state.user.authenticatingUser,
        failedLogin: state.user.failedLogin,
        isLoggedIn: state.user.isLoggedIn,
        error: state.user.error
    }
}

function mapDispatchToProps(dispatch) {
  return { 
    LoginUser: (username, password) => dispatch(LoginUser(username, password)), 
    getLocation: (lat, long) => dispatch(getLocation(lat, long))}
}


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);