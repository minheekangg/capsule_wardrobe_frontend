import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";

const NavBar = (props) => {
    return props.loggedIn ? <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#home">React-Bootstrap</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">
                Link
    </NavItem>
            <NavItem eventKey={2} href="#">
                Link
    </NavItem>
            <NavItem eventKey={2} href="#">
    </NavItem>
        </Nav>
    </Navbar> : null
    
   }
   
   const mapStateToProps = state => {return {loggedIn: state.user.isLoggedIn}}
   
   export default withRouter(connect(mapStateToProps)(NavBar))
   
{/* const Nav = (props) => {
    return <Menu pointing secondary>
            {props.loggedIn ? <Fragment>
                <Menu.Menu width={5}>
                    <Menu.Item as={NavLink} to="/closet" color={"green"} name="Closet" active={props.location.pathname === "/closet"} />
                    <Menu.Item as={NavLink} to="/" color={"black"} name="Capsule Wardrobe" active={props.location.pathname === "/"} />
                    <Menu.Item as={NavLink} to="/market" color={"orange"} name="Market" active={props.location.pathname === "/market"} />
                </Menu.Menu>

                <Menu.Menu position="right">
                    <Menu.Item as={NavLink} to="/login" name="Logout" color={"grey"} active={props.location.pathname === "/login"} />
                </Menu.Menu>
            </Fragment> : null
     </Menu>
} */}