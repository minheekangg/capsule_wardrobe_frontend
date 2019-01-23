import React from 'react'
import DonateMap from './DonateMap'
import { connect } from 'react-redux';
import { changeItemStatus } from "../actions/closetActions";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { LoadingPage } from './misc';
// import {getMarkers} from '../actions/mapActions'

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API

class Donate extends React.Component {
    state = {
        long: "",
        lat: ""
    }
    componentDidMount() {
        var location = this.props.city
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: location,
                key: API_KEY
            }
        }).then(r => {
            this.setState(
                {
                    long: r.data.results[0].geometry.location.lng,
                    lat: r.data.results[0].geometry.location.lat
                }
            );
        }).catch(error => {
            console.log(error)
        })
    }


  handleDonateButtonClick = () => {
      this.props.changeItemStatus(this.props.userId, this.props.firstItem.id, "Donate")
  }

  renderDonate = () => {
      return <div >
            <div className="fakeNavbar" style={{ backgroundColor: "#1D4306"}} />
            <div className="donate">
            <h4>Please confirm to donate</h4>
              <div className="row"> 
                  <div className="col s3">      
                    <div className="listing-item">
                        <img
                            src={this.props.firstItem.image}
                            alt={this.props.firstItem.id}
                        />
                        <h6>{this.props.firstItem.name}</h6>
                        <button onClick={()=>this.handleDonateButtonClick()}>
                            I'll donate!
                    </button>
                    </div>
                  </div>
                  <div className="col s9">      
                    <p style={{color: "grey"}}>Donation Bins Near You</p>
                    {this.props.donationMarkers.length > 0 ? <DonateMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px`, width: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        center={{ lat: this.state.lat, lng: this.state.long }}
                        marker={{markers: this.props.donationMarkers}}
                    />: <LoadingPage />}
                  </div>
              </div>
            </div>
        </div>
  }

  render() {
      return this.props.item.length > 0 ? this.renderDonate() : <Redirect to="/closet" /> 
  }
}

const mapStateToProps = state => {
    return { item: state.closet.itemToDelete, firstItem: state.closet.itemToDelete[0], userId: state.user.userId, isLoaded: state.closet.isLoaded, city: state.user.city, donationMarkers: state.donation.donationMarkers };
}

const mapDispatchToProps = dispatch =>{
    return { changeItemStatus: (userId, itemId, newStatus) => dispatch(changeItemStatus(userId, itemId, newStatus))};
}
export default connect(mapStateToProps, mapDispatchToProps)(Donate)