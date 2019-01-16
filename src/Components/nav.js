import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import {logout} from '../actions/userActions'

const NavBar = (props) => {

  const handleLogoutClick = () => {
    props.history.push('./login')
    props.logout()
  }

    return props.loggedIn ? <Navbar>
        <Nav className="navbarCss">
              <NavItem href="/closet" >
                <p className="navText" style={{ color: "#1D4306" }}>
                  Closet
                </p>
              </NavItem>
              <Navbar.Header style={{paddingLeft: "50px", "paddingRight": "50px"}}>
                <Navbar.Brand>
                  <a href="/">CAPSULE WARDROBE</a>
                </Navbar.Brand>
              </Navbar.Header>
              <NavItem href="/market">
                <p className="navText" style={{ color: "#C95D2D" }}>
                  Market
                </p>
              </NavItem>
        <button onClick={()=> handleLogoutClick()}>Logout</button>
        </Nav>
      </Navbar> : null; 
}
        
       
   const mapStateToProps = state => {
       return {
           loggedIn: state.user.isLoggedIn, 
     username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

    //  <Navbar.Text pullRight>props.username</Navbar.Text>
     
   