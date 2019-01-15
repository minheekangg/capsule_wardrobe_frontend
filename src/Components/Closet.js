import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchCloset, increaseTimesWorn } from "../actions/closetActions";
import { fetchCategories } from "../actions/categoryActions";
import { createOutfits } from '../actions/outfitActions'
import ClosetItem from './ClosetItem';
import Category from './Category';
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

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleOutfitSubmit = e => {
    e.preventDefault()
    this.props.createOutfits(formatDate(this.state.date), this.props.user, this.props.selectedItems);
    this.props.increaseTimesWorn(this.props.selectedItems, this.props.user)
  }

  renderCloset() {
    const sorted = sortByCategory(this.props.items)
    return (
      <Fragment>
      <Grid>
        <div className="category-menu">
      <Category category={this.props.categories}/>
        </div>
          <Row className="closet-container">
            {sorted.map(item => {
              return <ClosetItem key={item.id} image={item.image} name={item.name} id={item.id} times_worn={item.times_worn} category_id={item.category_id} />
               })
            }
        </Row>
      </Grid>
      </Fragment>
    );
  }
  renderSelection() {
    const sortedSelection = sortByCategory(this.props.selectedItems)
    return <div>
        <Form onSubmit={this.handleOutfitSubmit}>
          <h1>Selected:</h1>
          <div className="closet-container">
          {sortedSelection.map(selected => {
              return <Selection key={selected.id} image={selected.image} name={selected.name} id={selected.id} times_worn={selected.times_worn} />;
            })}
          </div>
          <DatePicker selected={this.state.date} onChange={this.handleDateChange} />
            <Button type="submit">Outfit</Button>
        </Form>
      </div>;
  }


  render() {
    return (
      <div>
      {this.props.hasOutfits ? <Redirect to='./outfits'/> : <div>
        <Link to="/additem" content="Add item" > Add more! </Link>
          {this.props.isLoaded ? this.renderCloset() : <LoadingPage />}
          {this.props.selectedItems.length > 0 ? this.renderSelection() : <div>"Please select items to wear today!"</div>}
        </div>
      }
    </div> )
  }
}

function mapStateToProps(state){
  console.log(state)
    return { user: state.user.userId, items: state.closet.items, isLoaded: state.closet.isLoaded, selectedItems: state.closet.selectedItems, categories: state.category.category, hasOutfits: state.outfit.outfitsLoaded };
}

function mapDispatchToProps(dispatch) {
  return { fetchCategories: id => dispatch(fetchCategories(id)), fetchCloset: id => dispatch(fetchCloset(id)), createOutfits: (date, id, itemsArr) => dispatch(createOutfits(date, id, itemsArr)), increaseTimesWorn: (itemsArr, userId) => dispatch(increaseTimesWorn(itemsArr, userId)) 
  };
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