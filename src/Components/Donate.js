import React from 'react'
import DonateMap from './DonateMap'
import { connect } from 'react-redux';
import { donateItem } from "../actions/closetActions";
import { Redirect } from "react-router-dom";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API


class Donate extends React.Component {
    // state = {
    //     rerender: false
    // }
    handleDonateButtonClick = () => {
    this.props.donateItem(this.props.userId, this.props.firstItem.id)
    // console.log("loaded?",this.props.isLoaded)
    // this.setState({ rerender: true })
    }

  renderDonate = () => {
        return <div>
            <h2>Please confirm to donate</h2>
            <div className="listing-item">
                <img
                    src={this.props.firstItem.image}
                    alt={this.props.firstItem.id}
                />
                <p>{this.props.firstItem.name}</p>
                <button onClick={()=>this.handleDonateButtonClick()}>
                    I'll donate!
              </button>
            </div>
            }
            <br />
            <h5>Please see nearby donations bins :) </h5>
            <DonateMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div style={{ height: `600px`, width: `600px` }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
  }

  render() {
      return this.props.item.length > 0 ? this.renderDonate() : <Redirect to="/closet" /> 
  }
}

const mapStateToProps = state => {
    return{
        item: state.closet.itemToDelete, firstItem: state.closet.itemToDelete[0], userId: state.user.userId, isLoaded: state.closet.isLoaded
    }
}

const mapDispatchToProps = dispatch =>{
    return { donateItem: (userId, itemId) => dispatch(donateItem(userId, itemId))}
}
export default connect(mapStateToProps, mapDispatchToProps)(Donate)