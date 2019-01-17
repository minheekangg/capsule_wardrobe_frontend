import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
class Welcome extends React.Component {

    render() {
        return ( this.props.loggedIn ? <div>
                <Button to="/closet"> Closet </Button>
                <Button to="/market"> Market </Button>
        </div> : <Redirect to="/login" />
        )
    }
} 

const mapStateToProps = state => {
    console.log("aflksjdfkajdlfalfjkdsjflksd",state)
    return {
        loggedIn: state.user.isLoggedIn
    }
}

export default withAuth(connect(mapStateToProps)(Welcome))