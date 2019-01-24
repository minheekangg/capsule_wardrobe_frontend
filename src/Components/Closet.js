import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchCloset, increaseTimesWorn, selectThisItem, replaceSelectedItem } from "../actions/closetActions";
import { fetchCategories } from "../actions/categoryActions";
import { createOutfits, fetchWeather } from "../actions/outfitActions";
import ClosetItem from './ClosetItem';
import ClosetView from './ClosetView';
import Weather from './Weather';
import Selection from './Selection';
import {LoadingPage} from './misc';

import { Button, Form, Grid, Row } from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import { Link, Redirect } from "react-router-dom";


class Closet extends React.Component {
  state = {
    date: new Date(),
    toOutfits: false
  };

  componentDidMount() {
    this.props.fetchCloset(this.props.user);
    this.props.fetchCategories();
  }


  handleDateChange = date => {
    this.setState({
      date: date
    }, () => { this.props.fetchWeather(this.props.location.latitude, this.props.location.longitude, this.state.date)}
    )
  }

  handleOutfitSubmit = e => {
    e.preventDefault();
    this.props.createOutfits(  
      formatDate(this.state.date),
      this.props.user,
      this.props.selectedItems,
      this.props.weather
    );
    this.props.increaseTimesWorn(this.props.selectedItems, this.props.user )
  };

  handleSelectItem = (newItemId, newItemCatId) => {
    const category = this.props.selectedItems.map(s => {
      return s.category_id;
    });
    if (category.includes(newItemCatId)) {
      const toBeReplaced = this.props.selectedItems.find(
        s => s.category_id === newItemCatId
      );
      this.props.replaceSelectedItem(newItemId, toBeReplaced.id);
    } else {
      this.props.selectThisItem(newItemId);
    }
  };

  renderCloset() {
    return <Fragment>
        <Grid>
          <div className="category-menu">
            <ClosetView count={this.props.items.length}/>
          </div>
          <Row className="closet-container">
            <ClosetItem items={this.props.items} handleSelectItem={this.handleSelectItem} category={this.props.categories} />
          </Row>
        </Grid> 
      </Fragment>;
  }
  renderSelection() {
    const sortedSelection = sortByCategory(this.props.selectedItems);
    return <div className="selection-container">
        <Form onSubmit={this.handleOutfitSubmit}>
          <h1>Selected:</h1>
          <Weather currentDate={this.state.date} />
          <DatePicker selected={this.state.date} onChange={this.handleDateChange} />
          <div className="closet-container">
            {sortedSelection.map(selected => {
              return <Selection key={selected.id} image={selected.image} name={selected.name} id={selected.id} times_worn={selected.times_worn} />;
            })}
          </div>
          <Button type="submit" style={{ margin: "2vh", backgroundColor: "grey" }}>
            Outfit
          </Button>
        </Form>
      </div>;
  }

  renderClosetAndSelectionContainer = () => {
    return this.props.selectedItems.length > 0 ? <div className="closetselection-container">
   { this.renderSelection()}
      <div style={{ width: "60%", marginLeft: "10vh"}}>
       { this.renderCloset()}
    </div>
      </div> : this.renderCloset();
  }


  render() {
    return <div>
        <div className="fakeNavbar" style={{ backgroundColor: "#1D4306" }} />
        {this.props.createdOutfit ? <Redirect to="./outfits" /> : <div>
            <div style={{ position: "relative", height: "2vh", fontSize: "15px" }}>
              <Link to="/additem" content="Add item" style={{ color: "#C95D2D", position: "absolute", right: 0, paddingRight: "2vh" }}>
                Add more!
              </Link>
              <Link to="/outfits" content="outfits" style={{ color: "#1D4306", position: "absolute", paddingLeft: "2vh" }}>
                See Outfits
              </Link>
            </div>

            {this.props.isLoaded ? this.renderClosetAndSelectionContainer() : <LoadingPage />}
          </div>}
      </div>;
  }
}

function mapStateToProps(state){
  console.log('%c inside closet', 'color:green',state)
  return { user: state.user.userId, items: state.closet.items, selectedItems: state.closet.selectedItems, categories: state.category.category, isLoaded: state.closet.isLoaded, location: state.user.location, weather: state.outfit.weather, outfitsLoaded: state.outfit.outfitsLoaded, createdOutfit: state.outfit.createdOutfit };
}

function mapDispatchToProps(dispatch) {
  return { 
    fetchCategories: id => dispatch(fetchCategories(id)), 
    fetchCloset: id => dispatch(fetchCloset(id)), 
    createOutfits: (date, id, itemsArr, weather) => dispatch(createOutfits(date, id, itemsArr, weather)), 
    increaseTimesWorn: (itemsArr, userId) => dispatch(increaseTimesWorn(itemsArr, userId)), 
    selectThisItem: id => dispatch(selectThisItem(id)), 
    replaceSelectedItem: (newId, oldId) => dispatch(replaceSelectedItem(newId, oldId)), 
    fetchWeather: (longitude, latitude, date) => dispatch(fetchWeather(longitude, latitude, date)) };
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Closet))


//HELPER METHOD
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function sortByCategory(arr) {
  return arr.sort(function (a, b) {
    return a.category_id - b.category_id
  })
}


