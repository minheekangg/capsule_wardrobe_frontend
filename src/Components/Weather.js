import React from 'react'
import { fetchWeather, fetchPrettyLocation } from '../actions/outfitActions'
import { connect } from 'react-redux'
import withAuth from "../hoc/withAuth";

class Weather extends React.Component {

  componentDidMount(){
      const date = (this.props.currentDate / 1000).toFixed(0)
      this.props.fetchWeather(this.props.location.latitude, this.props.location.longitude, date);
      this.props.fetchPrettyLocation(this.props.location.latitude, this.props.location.longitude)
  }

    displayWeather = () => {
        const icon_URL = "./images/icons/"+this.props.weather.weather +".svg"
        return <div> Weather in {this.props.weather.timezone} :
        <br/>
            <img height="30"  src={icon_URL} alt="icon" />
            {this.props.weather.temperature}&deg;
    </div>
    }


  render() {
      if (this.props.weather.weather.length > 0){
          return this.displayWeather()
      } else if (this.props.location.latitude.length > 0){
          return <p>Loading Weather</p>
      } else {
        return null
      } 
    }
}



function mapStateToProps(state) {
    return { weather: state.outfit.weather, location: state.user.location}
}

function mapDispatchToProps(dispatch){
    return { fetchWeather: (longitude, latitude, date) => dispatch(fetchWeather(longitude, latitude, date)), fetchPrettyLocation: (lat, long) => dispatch(fetchPrettyLocation(lat, long))}
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Weather))
