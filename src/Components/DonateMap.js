import React from 'react'
import DonateMarker from "./DonateMarker";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import {donationLocations} from '../types'
import { connect } from 'react-redux';
import { getMarkers } from "../actions/mapActions";

const DonateMap = withScriptjs(withGoogleMap((props) => {

    const markers = donationLocations.map(store => (
        <DonateMarker
        key={store.name}
        store={store.name}
        location={{ lat: store.latitude, lng: -store.longitude }}
    />
    ));


    console.log(props)
    return <GoogleMap defaultZoom={14} center={props.center}>
   
        {markers}
      </GoogleMap>;
}
))

const mapDispatchToProps = dispatch => {
    return { getMarkers: (lat, long) => dispatch(getMarkers(lat, long))}
}

export default connect(null, mapDispatchToProps)(DonateMap)
