import React from 'react'
import DonateMarker from "./DonateMarker";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
// import {donationLocations} from '../types'
import { connect } from 'react-redux';
// import { getMarkers } from "../actions/mapActions";

const DonateMap = withScriptjs(withGoogleMap((props) => {

    const markers = this.props.markers.map(store => (
        <DonateMarker
        key={store.name}
        store={store.name}
        location={{ lat: store.latitude, lng: -store.longitude }}
    />
    ));


    console.log(props.marker)
    return <GoogleMap defaultZoom={14} center={props.center}>
   
        {markers}
      </GoogleMap>;
}
))
function mapStateToProps(state) {
    return { markers: state.items.donationMarkers }
}
export default connect(mapStateToProps)(DonateMap)
