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
      return <div>{this.props.selection.length >0 ? <Redirect to="/listing" /> : (this.props.listings.length > 0 ? (<div className="closet-container">   {this.renderMarketListings()}  </div>) : null ) }</div>;
  }
}

function mapStateToProps(state) {
    return { user: state.user.userId, listings: state.market.listings, selection: state.market.select};
}

function mapDispatchToProps(dispatch) {
    return { fetchListings: () => dispatch(fetchListings()), selectListing: id => dispatch(selectListing(id)) };
}



export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Market))