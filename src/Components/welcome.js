import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { Carousel } from "react-bootstrap";
import { Redirect } from "react-router";
import { getLocation } from "../actions/outfitActions";
import '../css/main.css'
class Welcome extends React.Component {

    renderCarousel = () => {
        return <Carousel style={{ width: "98%", height: "80vh", marginTop: "4vh" }}>
            <Carousel.Item>
                <img width={300} height={150} alt="900x500" src="/carousel.png" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={300} height={150} alt="900x500" src="/carousel.png" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={300} height={150} alt="900x500" src="/carousel.png" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    }

 
    render() {
        return this.props.loggedIn ? <div className="welcome">
            <a className="leftButton" href="/closet"> </a>
                {this.renderCarousel()}
                <a className="rightButton" href="/market">  </a>
    </div> : <Redirect to="/login" />  }
} 

const mapStateToProps = state => {
    console.log("aflksjdfkajdlfalfjkdsjflksd",state)
    return {
        loggedIn: state.user.isLoggedIn, location: state.outfit.location
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{getLocation: ()=> dispatch(getLocation())}
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Welcome))