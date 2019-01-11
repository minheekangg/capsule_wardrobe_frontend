import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Nav = props => {
    return <Menu pointing secondary>
            {props.isLoggedIn ? (
                <Fragment>
                    <Menu.Item as={NavLink} to="/profile" name="Profile" active={props.location.pathname === '/profile'} />
                    <Menu.Menu position="right">
                        {/* TODO: logout */}
                        {/* <Menu.Item to="/logout" name="Logout" onClick={logout} /> */}
                    </Menu.Menu>
                </Fragment>
            ) : (
                    <Menu.Item as={NavLink} to="/login" name="Login" active={props.location.pathname === '/login'} />
                )}
        </Menu>
}
const mapStateToProps = ({ user }) => ({ user })
export default withRouter(connect(mapStateToProps)(Nav))