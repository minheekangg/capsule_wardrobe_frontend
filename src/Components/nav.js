import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { Navbar, Nav, NavItem } from "react-bootstrap";
import {logout} from '../actions/userActions'

const NavBar = (props) => {



  const handleLogoutClick = () => {
    props.history.push('./login')
    props.logout()
  }


  return props.loggedIn ? <div className="navbar-fixed">
    <nav >
      <div className="nav-wrapper">
        <a href="/" className="brand-logo center" style={{color: "black", fontSize: "2vh"}}>CAPSULE WARDROBE</a>
   
        <ul id="nav-mobile" className="right hide-on-med-and-down">
         <li><a href="/market" className="nav-closet-right">MARKET</a></li>
          <li> <button className="logout-button" onClick={() => handleLogoutClick()}>Logout</button> </li>
        </ul>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li> <p className="userIcon">{props.username}</p> </li>
          <li><a href="/closet" className="nav-closet-left">CLOSET</a></li>
        </ul>
     
      </div>
    </nav>
    </div> : null;

    // return props.loggedIn ? <Navbar>
    //     <Nav className="navbarCss">
    //           <NavItem href="/closet" >
    //             <p className="navText" style={{ color: "#1D4306" }}>
    //               Closet
    //             </p>
    //           </NavItem>
    //           <Navbar.Header style={{paddingLeft: "50px", "paddingRight": "50px"}}>
    //             <Navbar.Brand>
    //               <a href="/">CAPSULE WARDROBE</a>
    //             </Navbar.Brand>
    //           </Navbar.Header>
    //           <NavItem href="/market">
    //             <p className="navText" style={{ color: "#C95D2D" }}>
    //               Market
    //             </p>
    //           </NavItem>
    //     <button onClick={()=> handleLogoutClick()}>Logout</button>
    //     </Nav>
    //   </Navbar> : null; 
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

 
export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar)))
