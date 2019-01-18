import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DonateMarker from "./DonateMarker";
import {donationLocations} from '../types'

console.log(donationLocations)
// props = [(name,lat,-long)] NEGATIVE LONGITUDE KEY TO LIFE
const DonateMap = withScriptjs(withGoogleMap((props) => {

    const markers = donationLocations.map(store => <DonateMarker
        key={store.name}
        store={store.name}
        location={{ lat: store.latitude, lng: -store.longitude }}
    />);

    return (
        <GoogleMap
            defaultZoom={14}
            center={{ lat: 40.7053, lng: -74.0141 }}
            >
            {markers}
        </GoogleMap>
    );
}
))

export default DonateMap;