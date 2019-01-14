import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchCloset } from '../actions/closetActions'
import { fetchCategories } from "../actions/categoryActions";
import { createOutfits } from '../actions/outfitActions'
import ClosetItem from './ClosetItem';
import Category from './Category';
import Selection from './Selection';
import {LoadingPage} from './misc';

import { Button, Form, Grid, Row } from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import { NavLink } from "react-router-dom";

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

  handleOutfitSubmit = () => {
    this.props.createOutfits(formatDate(this.state.date), this.props.user, this.props.selectedItems);
  }

  renderCloset() {
    return (
      <Fragment>
      <Category category={this.props.categories}/>
      <Grid>
          <Row className="closet-container">
        {this.props.items.map(item => {
          return <ClosetItem key={item.id} image={item.image} name={item.name} id={item.id} times_worn={item.times_worn} category_id={item.category_id} />
          })
        }
        </Row>
      </Grid>
      </Fragment>
    );
  }
  renderSelection() {
    return (
      <div>
        <Form onSubmit={this.handleOutfitSubmit}>
          <h1>Selected:</h1>
          <div clasName="closet-container">
          {this.props.selectedItems.map(selected => {
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
  return { fetchCategories: id => dispatch(fetchCategories(id)),
    fetchCloset: id => dispatch(fetchCloset(id)), 
    createOutfits: (date, id, itemsArr) => dispatch(createOutfits(date, id, itemsArr)) };
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