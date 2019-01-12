import React from 'react'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchCloset } from '../actions/closetActions'
import { fetchCategories } from "../actions/categoryActions";
import { createOutfits } from '../actions/outiftActions'
import ClosetItem from './ClosetItem';
import Category from './Category';
import Selection from './Selection';
import {LoadingPage} from './misc';

import { Button, Form } from "semantic-ui-react";
import withAuth from "../hoc/withAuth";
import { NavLink } from "react-router-dom";

class Closet extends React.Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    this.props.fetchCloset(this.props.user);
    this.props.fetchCategories();
  }

  addItemClick = () => {
    console.log("clicked");
  };

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleOutfitSubmit = () => {
    console.log("userid", this.props.user, "date", formatDate(this.state.date), "selected", this.props.selectedItems)
    this.props.createOutfits(formatDate(this.state.date), this.props.user);
  }

  renderCloset() {
    return (
      <div>
        <Category category={this.props.categories}/>
        {this.props.items.map(e => {
          return (
            <ClosetItem
              key={e.id}
              image={e.image}
              name={e.name}
              id={e.id}
              times_worn={e.times_worn}
              category_id={e.category_id}
            />
          );
        })}
      </div>
    );
  }
  renderSelection() {
    return (
      <div>
        <Form onSubmit={this.handleOutfitSubmit}>
          <h1>Selected:</h1>
          {this.props.selectedItems.map(e => {
            return (
              <Selection
                key={e.id}
                image={e.image}
                name={e.name}
                id={e.id}
                times_worn={e.times_worn}
              />
            );
          })}
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
          />
          <Button>Outfit</Button>
        </Form>
      </div>
    );
  }
  // <Button as={NavLink} to='./outfits'>Outfit</Button>

  render() {
    console.log("inside closet, props are", this.props);
    return (
      <div>
        <Button as={NavLink} to="/additem" content="Add item" />
        {this.props.isLoaded ? this.renderCloset() : <LoadingPage />}
        {this.props.selectedItems.length > 0 ? (
          this.renderSelection()
        ) : (
          <div>"Please select items to wear today!"</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log(state)
    return (
       { 
        user: state.user.userId,
        items: state.closet.items,
        isLoaded: state.closet.isLoaded,
        selectedItems: state.closet.selectedItems,
        categories: state.category.category
        }
    )
}

function mapDispatchToProps(dispatch) {
  return { fetchCategories: id => dispatch(fetchCategories(id)),fetchCloset: id => dispatch(fetchCloset(id)), createOutfits: (date, id) => dispatch(createOutfits(date, id)) };
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