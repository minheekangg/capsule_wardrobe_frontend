import React from 'react'
import { Link } from "react-router-dom";
export default class LandingPage extends React.Component {

    render() {
        return (
            <div>
                <Link to="/closet"> Closet </Link>
                <Link to="/market"> Market </Link>
            </div>
        )
    }
}