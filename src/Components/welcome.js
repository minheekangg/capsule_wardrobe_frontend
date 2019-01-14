import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { Button } from "react-bootstrap";
class Welcome extends React.Component {

    render() {
        return ( this.props.loggedIn ? <div>
                <Button to="/closet"> Closet </Button>
                <Button to="/market"> Market </Button>
            </div> : null
        )
    }
} 

const mapStateToProps = state => {
    console.log(state)
    return {
        loggedIn: state.user.isLoggedIn
    }
}

export default withAuth(connect(mapStateToProps)(Welcome))