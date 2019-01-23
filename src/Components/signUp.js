import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { SignUpUser, getLocation } from "../actions/userActions";
import '../App.css'
import {  FormGroup,  FormControl, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

class signUp extends React.Component{
    state = {
        username: "",
        password: "",
        city: "",
        isSignedUp: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
      
      handleSubmit = (e) => { 
        e.preventDefault()
        this.props.SignUpUser(this.state.username, this.state.password, this.state.city)
        this.setState({ username: "", password: "", city: "", isSignedUp: true });

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
    }



    renderSignUpForm = () => {
      return <div style={{ height: "100vh" }}>
            <Row className="show-grid">
              <Col xs={6} md={4} />
              <Col xs={6} md={4}>
              <form onSubmit={this.handleSubmit} className="loginForm" style={{marginTop: "5vh"}}>
                  <h2 className="loginHeader">CAPSULE WARDROBE</h2>
                  <FormControl.Feedback />
                  <FormGroup widths="equal" className="loginInput" >
                    <FormControl type="text" label="Text" name="username" placeholder="Enter username" onChange={this.handleChange} value={this.state.username} />
                    <FormControl type="password" label="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <FormControl type="text" label="Text" name="city" placeholder="Enter your city" onChange={this.handleChange} value={this.state.city} />
                  </FormGroup>
                  <div className="loginbutton">
                <Col md={6}>
                  <a href="login" style={{ color: "#1D4306", border: "none", font: "inherit", cursor: "pointer" }}>
                    Sign In
                      </a>
                </Col>
                <Col md={6}>
                  <button to="/signup" style={{ color: "#C95D2D", border: "none", font: "inherit", cursor: "pointer" }}> Submit </button>
                </Col>
                  </div>
                </form>
              </Col>
              <Col xs={6} md={4} />
            </Row>
          </div>;
    }
    // <FormControl type="text" label="Text" name="image" placeholder="Upload Image" onChange={this.handleChange} value={this.state.image} />
    
    render(){
      console.log("is signed up?", this.state.isSignedUp)
        return this.state.isSignedUp ? (
        <Redirect to="/login" />
      ) : (
          <div className="card">
              {this.renderSignUpForm()}
          </div>
        )
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

const mapDispatchToProps = dispatch => {
  return {
    SignUpUser: (username, password, city) => dispatch(SignUpUser(username, password, city)),
    getLocation: ()=> dispatch(getLocation())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(signUp)
);