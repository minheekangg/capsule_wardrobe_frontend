import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";

const NavBar = (props) => {
    return props.loggedIn ? <Navbar>
        <Nav className="navbarCss">
              <NavItem href="/closet" >
                <p className="navText" style={{ color: "#1D4306" }}>
                  Closet
                </p>
              </NavItem>
              <Navbar.Header style={{paddingLeft: "50px", "paddingRight": "50px"}}>
                <Navbar.Brand>
                  <a href="/">CAPSULE</a>
                </Navbar.Brand>
              </Navbar.Header>
              <NavItem href="/market">
                <p className="navText" style={{ color: "#C95D2D" }}>
                  Market
                </p>
              </NavItem>
        </Nav>
      </Navbar> : null; 
}
        
       
   const mapStateToProps = state => {
       return {
           loggedIn: state.user.isLoggedIn, 
     username: state.user.username
  }
}
 
export default withRouter(connect(mapStateToProps)(NavBar))

    //  <Navbar.Text pullRight>props.username</Navbar.Text>
     
   