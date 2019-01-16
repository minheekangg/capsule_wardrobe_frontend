import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { LoginUser } from "../actions/userActions";
import '../App.css'
import {  FormGroup, HelpBlock,  FormControl, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                  <h2 className="loginHeader">CAPSULE WARDROBE</h2>
                  <FormControl.Feedback />
                  <HelpBlock error header={this.props.failedLogin ? this.props.error : null} />
                  <FormGroup widths="equal" className="loginInput" loading={this.props.authenticatingUser} error={this.props.failedLogin}>
                    <FormControl type="text" label="Text" name="username" placeholder="Enter text" onChange={this.handleChange} value={this.state.username} />
                    <FormControl type="password" label="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
                  </FormGroup>
                  <div className="loginbutton">
                    <Col md={6}>
                      <button style={{ color: "#1D4306", border: "none" }}>
                        Sign In
                      </button>
                    </Col>
                    <Col md={6}>
                      <Link to="./login" style={{ color: "#C95D2D" }}>
                        Sign Up
                      </Link>
                    </Col>
                  </div>
                </form>
              </Col>
              <Col xs={6} md={4} />
            </Row>
          </div>;
    }
    
    render(){
        return this.props.isLoggedIn ? <Redirect to="/welcome" /> : this.renderLoginForm()
    }
}

const mapStateToProps = (state) => {
    // console.log("inside login", state)
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