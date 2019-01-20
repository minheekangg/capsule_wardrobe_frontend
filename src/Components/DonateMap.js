import React from 'react'
import DonateMarker from "./DonateMarker";
// import DonateMapWrapper from "./DonateMapWrapper";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import {donationLocations} from '../types'


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

export default DonateMap
