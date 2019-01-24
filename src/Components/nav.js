import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
// import { Redirect } from "react-router";
// import { Navbar, Nav, NavItem } from "react-bootstrap";
import {logout} from '../actions/userActions'
// import { getLocation } from "../actions/outfitActions";


class NavBar extends React.Component{

   handleLogoutClick = () => {
    this.props.history.push('./login')
    this.props.logout()
  }



  render(){

    return this.props.loggedIn ? <div className="navbar-fixed">
       <nav >
         <div className="nav-wrapper">
           <p className="brand-logo center" style={{ color: "black", fontSize: "20px" }}>CAPSULE WARDROBE</p>

           <ul id="nav-mobile" className="right hide-on-med-and-down">
             <li><Link to="/market" className="nav-closet-right">MARKET</Link></li>
             <li> <button className="logout-button" onClick={() => this.handleLogoutClick()}>Logout</button> </li>
           </ul>
           <ul id="nav-mobile" className="left hide-on-med-and-down">
             <li> <p className="userIcon">{this.props.username}</p> </li>
            <li><Link to="/closet" className="nav-closet-left">CLOSET</Link></li>
           </ul>
         </div>
       </nav>
    </div> : <div className="navbar-fixed">
        <nav >
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center" style={{ color: "black", fontSize: "20px" }}>CAPSULE WARDROBE</a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><Link to="/login" className="userIcon">Login </Link></li>
            </ul>
          </div>
        </nav>
      </div>
  }

}
        
       
   const mapStateToProps = state => {
       return {
           loggedIn: state.user.isLoggedIn, 
     username: state.user.username, location: state.user.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
