import React from 'react'
import { connect } from 'react-redux';
import { postMyItem } from "../actions/marketActions";
import { changeItemStatus } from "../actions/closetActions";
import { Redirect, Link } from "react-router-dom";


class Sell extends React.Component {
    state = {
        price: 0
    }

  handleSellPost = (e) => {
      e.preventDefault()
      this.props.changeItemStatus(this.props.userId,this.props.firstItem.id, "Sell" )
      this.props.postMyItem(this.props.userId, this.props.firstItem.id, this.state.price)
  }

    handlePriceChange = event => {
        this.setState({price: event.target.value })
    }

  renderSellForm = () => {
    return (
        <div>
            <form onSubmit={(e)=> this.handleSellPost(e)}>
              <h2>Please add more information to post to Market</h2>
              <div className="listing-item">
                <img src={this.props.firstItem.image} alt={this.props.firstItem.id} />
                <p>{this.props.firstItem.name}</p>
                <input type="number" min="0" placeholder="Price" onChange={this.handlePriceChange}value={this.state.price}/>
              </div>
                <button type="Submit">I'll sell!</button>
            </form>
                <Link to="/donate">I'll donate!</Link>
        </div>
    );
  };


  render() {
      return this.props.item.length > 0 ? this.renderSellForm() : <Redirect to="/market" />;
  }
}

const mapStateToProps = state => {
    return {
        item: state.closet.itemToDelete, firstItem: state.closet.itemToDelete[0], userId: state.user.userId
    }
}

const mapDispatchToProps = dispatch => {
    return { postMyItem: (userId, itemId, price) => dispatch(postMyItem(userId, itemId, price)), changeItemStatus: (userId, itemId, newStatus) => dispatch(changeItemStatus(userId, itemId, newStatus)) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sell)