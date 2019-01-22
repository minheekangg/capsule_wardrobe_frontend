import React from 'react'
import { fetchListings, selectListing } from "../actions/marketActions";
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import MarketItem from './MarketItem'
import { fetchCategories } from "../actions/categoryActions";
// import Listing from './Listing'
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";
class Market extends React.Component {
    state={
        reload: false,
        filtered: []
    }

  componentDidMount() {
    this.props.fetchListings();
      this.props.fetchCategories()
  }

  handleListingInfoClick = (itemId) => {
      this.props.selectListing(itemId)
      this.setState({reload: true})
  }

    handleFilterListings = event => {
        if (event.target.innerText === "View All") {
           this.setState({filtered: this.props.listings})
        } else {
           this.setState({filtered: this.props.listings.filter(l=> l.item.category_id === event.target.value) })
        }
    }

    rendermarketOption = () => {
        return <div className="market-options">
            <div style={{ height: "20vh", marginTop: "5vh", border: "none"}}>
                <Image src={this.props.user.image} rounded />
              <h4>{this.props.user.username}</h4>
            </div>
            <div style={{width:"100%", height: "1vh", backgroundColor: "grey"}}></div>
            <ListGroup componentClass="ul" onClick={this.handleFilterListings}>
              <ListGroupItem className="list-group-item">
                View All
              </ListGroupItem>
              {this.props.categories.map(c=> {
                  return (<ListGroupItem className="list-group-item" value={c.id} key={c.id}>
                      {c.name}
              </ListGroupItem>)
              })}
            </ListGroup>
          </div>;
    }


  renderMarketListings = () => {
      return this.state.filtered.length > 0 ? this.state.filtered.map(e => {
          return <MarketItem item={e} key={e.id} handleListingInfoClick={this.handleListingInfoClick} />
      }) : this.props.listings.map(e=> {
        return <MarketItem item={e} key={e.id} handleListingInfoClick={this.handleListingInfoClick} />
    })
  }


  render() {
    // console.log(this.props.userId, "available", this.props.listings, "mine", this.props.myItems);
      return <div>
          <div className="fakeNavbar" style={{ backgroundColor: "#C95D2D" }} />
          {this.props.selection.length > 0 ? <Redirect to="/listing" /> : this.props.listings.length > 0 ? <div className="closet-container">
              <Grid>
                  <Row className="show-grid" style={{marginLeft: "-40vh"}}>
                      <Col  md={3}>
                          {this.rendermarketOption()}
                      </Col>
                      <Col  md={9}>
                      <div className="market-listing-container"> 
                        {this.renderMarketListings()}
                      </div>
                      </Col>
                  </Row>
                </Grid>
            </div> : null}
        </div>;
  }
}

function mapStateToProps(state) {
    console.log(state)
    return { userId: state.user.userId, listings: filterItemsAvailable(state.market.listings, state.user.userId), selection: state.market.select, myItems: filterMyItemsAvailable(state.market.listings, state.user.userId), user: state.user, categories: state.category.category };
}

function mapDispatchToProps(dispatch) {
    return { fetchListings: () => dispatch(fetchListings()), selectListing: id => dispatch(selectListing(id)), fetchCategories: () => dispatch(fetchCategories()) };
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Market))

//HELPER METHODS:
function filterItemsAvailable(arr, userId){
    return arr.filter(e=> {
        return e.seller_id !== userId
    })
}
function filterMyItemsAvailable(arr, userId){
    return arr.filter(e=> {
        return e.seller_id === userId
    })
}