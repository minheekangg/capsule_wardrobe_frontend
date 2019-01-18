import React from 'react'
import DonateMap from './DonateMap'

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API
export default class Donate extends React.Component{
    render(){
        return (
        <div>Iam the container
                <DonateMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px`, width: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}

                />
        </div>
        )
    }
}
