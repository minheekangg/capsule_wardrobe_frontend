import React from 'react'
import { fetchListings, selectListing } from "../actions/marketActions";
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import MarketItem from './MarketItem'
// import Listing from './Listing'
import { Redirect } from "react-router-dom";
class Market extends React.Component {
    status={
        reload: false
    }

  componentDidMount() {
    this.props.fetchListings();
  }

  handleListingInfoClick = (itemId) => {
      this.props.selectListing(itemId)
      this.setState({reload: true})
  }

  renderMarketListings = () => {
    return this.props.listings.map(e=> {
        return <MarketItem item={e} key={e.id} handleListingInfoClick={this.handleListingInfoClick} />
    })
  }


  render() {
    console.log(this.props.userId, "available", this.props.listings, "mine", this.props.myItems);
      return <div>{this.props.selection.length >0 ? <Redirect to="/listing" /> : (this.props.listings.length > 0 ? (<div className="closet-container">   {this.renderMarketListings()}  </div>) : null ) }</div>;
  }
}

function mapStateToProps(state) {
    return { userId: state.user.userId, listings: filterItemsAvailable(state.market.listings, state.user.userId), selection: state.market.select, myItems: filterMyItemsAvailable(state.market.listings, state.user.userId) };
}

function mapDispatchToProps(dispatch) {
    return { fetchListings: () => dispatch(fetchListings()), selectListing: id => dispatch(selectListing(id)) };
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Market))

//HELPER METHODS:
function filterItemsAvailable(arr, userId){
    return arr.filter(e=> {
        return e.buyer_id === null && e.seller_id !== userId
    })
}
function filterMyItemsAvailable(arr, userId){
    return arr.filter(e=> {
        return e.seller_id === userId
    })
}