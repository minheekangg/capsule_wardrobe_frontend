import React from 'react'
import { connect } from 'react-redux';
import { postMyItem } from "../actions/marketActions";
import { changeItemStatus } from "../actions/closetActions";
import { Redirect } from "react-router-dom";
import { Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";


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
    return <div>
        <div className="fakeNavbar" style={{ backgroundColor: "#C95D2D" }} />
        <form onSubmit={e => this.handleSellPost(e)} className="donate">
          <h4>Please add more information to post to Market</h4>
          <div className="listing-item">
            <img src={this.props.firstItem.image} alt={this.props.firstItem.id} />
            <h6>{this.props.firstItem.name}</h6>
            Price:
            <input type="number" min="0" placeholder="Price" onChange={this.handlePriceChange} value={this.state.price} />
          </div>
            <Button type="Submit" style={{ marginLeft: "2vh", backgroundolor: "grey" }} >I'll sell!</Button>
        </form>
      </div>;
  };
//   <Button style={{ marginLeft: "426px", marginTop: "2vh"}} href="/donate">I'll donate instead</Button>


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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sell))