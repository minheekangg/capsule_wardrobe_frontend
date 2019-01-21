import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchCloset, increaseTimesWorn, selectThisItem, replaceSelectedItem } from "../actions/closetActions";
import { fetchCategories } from "../actions/categoryActions";
import { createOutfits } from '../actions/outfitActions'
import ClosetItem from './ClosetItem';
import ClosetView from './ClosetView';
import Selection from './Selection';
import {LoadingPage} from './misc';

import { Button, Form, Grid, Row } from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import { Link, Redirect } from "react-router-dom";


class Closet extends React.Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    this.props.fetchCloset(this.props.user);
    this.props.fetchCategories(this.props.user);
  }

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  handleOutfitSubmit = e => {
    e.preventDefault();
    this.props.createOutfits(
      formatDate(this.state.date),
      this.props.user,
      this.props.selectedItems
    );
    this.props.increaseTimesWorn(this.props.selectedItems, this.props.user);
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
    // console.log("HERE inside rendercloset function", this.props.items )
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
    return (
      <div>
        
        <Form onSubmit={this.handleOutfitSubmit}>
          <h1>Selected:</h1>
          <div className="closet-container">
            {sortedSelection.map(selected => {
              return (
                <Selection
                  key={selected.id}
                  image={selected.image}
                  name={selected.name}
                  id={selected.id}
                  times_worn={selected.times_worn}
                />
              );
            })}
          </div>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
          />
          <Button type="submit">Outfit</Button>
        </Form>
      </div>
    );
  }

  render() {
    return <div>
        <div className="fakeNavbar" style={{ backgroundColor: "#1D4306" }} />
        {this.props.hasOutfits ? <Redirect to="./outfits" /> : <div>
            <Link to="/additem" content="Add item" style={{ color: "#C95D2D" }}>
              Add more!
            </Link>
            <br />
            <Link to="/outfits" content="outfits" style={{ color: "#1D4306" }}>
              See Outfits
            </Link>
            {this.props.isLoaded ? this.renderCloset() : <LoadingPage />}
            {this.props.isLoaded ? this.renderSelection() : <div>
                "Please select items to wear today!"
              </div>}
          </div>}
      </div>;
  }
}

function mapStateToProps(state){
  console.log('%c inside closet', 'color:green',state)
  return { user: state.user.userId, items: state.closet.items, selectedItems: state.closet.selectedItems, categories: state.category.category, hasOutfits: state.outfit.outfitsLoaded, isLoaded: state.closet.isLoaded };
}

function mapDispatchToProps(dispatch) {
  return { fetchCategories: id => dispatch(fetchCategories(id)), fetchCloset: id => dispatch(fetchCloset(id)), createOutfits: (date, id, itemsArr) => dispatch(createOutfits(date, id, itemsArr)), increaseTimesWorn: (itemsArr, userId) => dispatch(increaseTimesWorn(itemsArr, userId)), selectThisItem: id => dispatch(selectThisItem(id)), replaceSelectedItem: (newId, oldId) => dispatch(replaceSelectedItem(newId, oldId)) };
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


