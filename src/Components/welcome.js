import React from 'react'
import { connect } from 'react-redux';
// import withAuth from "../hoc/withAuth";
import { Carousel } from "react-bootstrap";
// import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import '../css/main.css'
import image1 from '../images/note1.png'
// import image2 from '../images/note3.png'
import image3 from '../images/testt.png'
// import image4 from '../images/1.png'
import guide from '../images/CAPSULEGUIDE.png'
import def from '../images/capusle-definition.jpg'
class Welcome extends React.Component {

    renderCarousel = () => {
        return <Carousel style={{ width: "98%", height: "700px", marginTop: "50px" }}>
            <Carousel.Item>
                <img style={{ marginLeft: "240px" }} alt="def" src={def} />
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ marginLeft: "240px" }} alt="image2" src={image1} />
            </Carousel.Item>
            <Carousel.Item>
              <img style={{ marginLeft: "220px", width: "80%" }} alt="image2" src={image3} />
            </Carousel.Item>
            <Carousel.Item>
              <img style={{ marginLeft: "240px" }} alt="guide" src={guide} />
            </Carousel.Item>
          </Carousel>;
    }
            // <Carousel.Item>
            //   <img style={{ marginLeft: "200px", width: "80%" }} alt="image3" src={image2} />
            // </Carousel.Item>
            // <Carousel.Item>
            //     <img style={{ marginLeft: "93px", width: "90%", height:"100%" }} alt="image4" src={image4} />
            // </Carousel.Item>

 
    render() {
        return this.props.loggedIn ? <div className="welcome">
            <Link className="leftButton" to="/closet"> </Link>
                <br/>
                {this.renderCarousel()}
            <Link className="rightButton" to="/market">  </Link>
        </div> : <div className="welcome">
                <p className="leftButton"> </p>
                <br />
                {this.renderCarousel()}
                <p className="rightButton">  </p>
            </div> }
} 

const mapStateToProps = state => {
    return {
        loggedIn: state.user.isLoggedIn, location: state.outfit.location
    }
}

export default connect(mapStateToProps)(Welcome)