import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { LoginUser } from "../actions/userActions";
import { Button, Form, Segment, Message } from "semantic-ui-react";

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

    render(){
        return this.props.isLoggedIn ? (
            <Redirect to="/" />
        ) : (
                <Segment>
                    <Form
                        onSubmit={this.handleLoginSubmit}
                        size="mini"
                        key="mini"
                        loading={this.props.authenticatingUser}
                        error={this.props.failedLogin}
                    >
                        <Message error header={this.props.failedLogin ? this.props.error : null} />
                        <Form.Group widths="equal">
                            <Form.Input
                                label="username"
                                placeholder="username"
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                            <Form.Input
                                type="password"
                                label="password"
                                placeholder="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("inside login", state)
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