import React from "react";
import { Marker } from "react-google-maps";
import image from "../images/earth.png"; 
// import { connect } from 'react-redux';
// import StoreCard from "./StoreCard"
// import { InfoWindow } from 'google-maps-react';

 export default class DonateMarker extends React.Component {

    state = {
        clicked: false,
        activeStatus: false
    }

    toggleMarker = () => {
        console.log("u clicked a marker");
        this.setState({
            clicked: !this.state.clicked, activeStatus: !this.state.activeStatus
        })
    }


    render() {
        // console.log("marker props", this.props.store);
        return (
            <div>
                <Marker onClick={this.toggleMarker}
                    position={this.props.location}
                    icon={image}
                >
                    {this.state.clicked && this.state.activeStatus ?

                        <p style={{ fontFamily: 'Courgette', fontSize: '40px' }}>{this.props.store.name}</p>

                        : null}
                </Marker>
            </div>
        );
    }
}


// // TODO: GET INFO WINDOW TO WORK!!!!!!!!!!
// {this.state.clicked && this.state.activeStatus ?
//   <InfoWindow maxWidth={800} defaultPosition={ this.props.location } visible={this.state.clicked}>
//   <StoreCard store={this.props.store}/>
//   </InfoWindow> : null
// }

// { this.state.isOpen && this.state.activeMarker ?
//   <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
//   <StoreCard toggleShowPage={this.props.toggleShowPage} dr={this.props.store}/>
//   </InfoWindow> : null
// }


