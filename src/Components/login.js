import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { LoginUser } from "../actions/userActions";
import '../App.css'
import {  FormGroup,  FormControl, Row, Col, HelpBlock } from "react-bootstrap";
// import { Link } from "react-router-dom";

class Login extends React.Component{
    state = {
        username: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLoginSubmit = (e) => { 
        e.preventDefault()
        this.props.LoginUser(this.state.username, this.state.password)
        this.setState({ username: "", password: "" });
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
                    <FormControl type="text" label="Text" name="username" placeholder="Enter text" onChange={this.handleChange} value={this.state.username} style={{ color: "grey" }} />
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
        console.log(this.props)
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

export default withRouter(
  connect(
    mapStateToProps,
    { LoginUser }
  )(Login)
);