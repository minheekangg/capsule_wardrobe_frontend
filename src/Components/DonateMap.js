import React from 'react'
import DonateMarker from "./DonateMarker";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";


const DonateMap = withScriptjs(withGoogleMap((props) => {

    const markers = props.marker.markers.map(store => {
          return <DonateMarker
          key={store.name}
          store={store.name}
              location={{ lat: store.geometry.location.lat, lng: store.geometry.location.lng }}
      />
    });


    console.log(props.marker)
    return <GoogleMap defaultZoom={14} center={props.center}>
   
        {markers}
      </GoogleMap>;
}
))

export default DonateMap
