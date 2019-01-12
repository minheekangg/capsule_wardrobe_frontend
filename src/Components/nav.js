import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Nav = (props) => {
    return <Menu pointing secondary>
        {props.loggedIn ? <Fragment>
            <Menu.Menu position="center">
              <Menu.Item as={NavLink} to="/closet" color={"green"} name="Closet" active={props.location.pathname === "/closet"} />
                <Menu.Item as={NavLink} to="/" color={"black"} name="Capsule Wardrobe" active={props.location.pathname === "/"} />
              <Menu.Item as={NavLink} to="/market" color={"orange"} name="Market" active={props.location.pathname === "/market"} />
            </Menu.Menu>

            <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/login" name="Logout" color={"grey"} active={props.location.pathname === "/login"} />
            </Menu.Menu>
        </Fragment> : <Menu.Item as={NavLink} to="/login" color={"grey"} name="Login" active={props.location.pathname === "/login"} />}
      </Menu>;
}

const mapStateToProps = state => {

    return(
        {loggedIn: state.user.isLoggedIn}
    )
}

export default withRouter(connect(mapStateToProps)(Nav))
