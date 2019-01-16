import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { SignUpUser } from "../actions/userActions";
import '../App.css'
import {  FormGroup,  FormControl, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

class signUp extends React.Component{
    state = {
        username: "",
        password: "",
        city: "",
        image: "",
        isSignedUp: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }
      
      handleSubmit = (e) => { 
        e.preventDefault()
        this.props.SignUpUser(this.state.username, this.state.password);
        this.setState({ username: "", password: "", isSignedUp: true });
    }



    renderSignUpForm = () => {
        return <div>
            <Row className="show-grid">
              <Col xs={6} md={4} />
              <Col xs={6} md={4}>
              <form onSubmit={this.handleSubmit} className="loginForm">
                  <h2 className="loginHeader">CAPSULE WARDROBE</h2>
                  <FormControl.Feedback />
                  <FormGroup widths="equal" className="loginInput" >
                    <FormControl type="text" label="Text" name="username" placeholder="Enter text" onChange={this.handleChange} value={this.state.username} />
                    <FormControl type="password" label="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <FormControl type="text" label="Text" name="city" placeholder="Enter your city" onChange={this.handleChange} value={this.state.city} />
                    <FormControl type="text" label="Text" name="image" placeholder="Upload Image" onChange={this.handleChange} value={this.state.image} />
                  </FormGroup>
                  <div className="loginbutton">
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                      <button type="submit" style={{ color: "#C95D2D" }}>
                        submit
                      </button>
                    </Col>
                  </div>
                </form>
              </Col>
              <Col xs={6} md={4} />
            </Row>
          </div>;
    }
    
    render(){
        return this.state.isSignedUp ? (
        <Redirect to="/welcome" />
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

export default withRouter(
  connect(
    mapStateToProps,
    { SignUpUser }
  )(signUp)
);