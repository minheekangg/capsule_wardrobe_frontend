import React from 'react'
import { connect } from 'react-redux';
// import { donateItem } from "../actions/closetActions";
import { Redirect } from "react-router-dom";


class Sell extends React.Component {

    // handleDonateButtonClick = () => {
    //     this.props.donateItem(this.props.userId, this.props.firstItem.id)
    // }

    renderSellForm = () => {
        return <form>
            <h2>Please add more information to post to Market</h2>
            <div className="listing-item">
                <img
                    src={this.props.firstItem.image}
                    alt={this.props.firstItem.id}
                />
                <p>{this.props.firstItem.name}</p>
                <button>
                    I'll donate!
              </button>
            </div>
        </form>
            
    }

    // return this.props.item.length > 0 ? this.renderSellForm() : <Redirect to="/market" />;
    render() {
        return this.props.item.length > 0 ? this.renderSellForm() : "hello"
    }
}

const mapStateToProps = state => {
    return {
        item: state.closet.itemToDelete, firstItem: state.closet.itemToDelete[0], userId: state.user.userId, isLoaded: state.closet.isLoaded
    }
}

const mapDispatchToProps = dispatch => {
    // return { sellItem: (userId, itemId) => dispatch(donateItem(userId, itemId)) }
}
export default connect(mapStateToProps, null)(Sell)