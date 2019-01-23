import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { Carousel } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import '../css/main.css'
import image1 from '../images/note1.png'
import image2 from '../images/note2.png'
import image3 from '../images/note3.png'
import image4 from '../images/1.png'
class Welcome extends React.Component {

    renderCarousel = () => {
        return <Carousel style={{ width: "98%", height: "700px", marginTop: "50px" }}>
            <Carousel.Item>
                <img style={{ marginLeft: "250px" }}alt="image1" src={image1} />
            </Carousel.Item>
            <Carousel.Item>
                <img width={"100%"} height={150} style={{position:"center"}}alt="image2" src={image2} />
            </Carousel.Item>
            <Carousel.Item>
                <img width={"100%"} height={150} alt="image3" src={image3} />
            </Carousel.Item>
            <Carousel.Item>
                <img width={"100%"} height={150} alt="image4" src={image4} />
            </Carousel.Item>
        </Carousel>
    }

 
    render() {
        return this.props.loggedIn ? <div className="welcome">
            <Link className="leftButton" to="/closet"> </Link>
                <br/>
                {this.renderCarousel()}
            <Link className="rightButton" to="/market">  </Link>
    </div> : <Redirect to="/login" />  }
} 

const mapStateToProps = state => {
    console.log("aflksjdfkajdlfalfjkdsjflksd",state)
    return {
        loggedIn: state.user.isLoggedIn, location: state.outfit.location
    }
}

export default withAuth(connect(mapStateToProps)(Welcome))