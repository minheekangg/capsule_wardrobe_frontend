import React from 'react'
import { connect } from "react-redux";
import { deselect, purchaseItem } from "../actions/marketActions";
import { Redirect } from "react-router-dom";
import { addItem } from "../actions/closetActions";

class Listing extends React.Component{
    state={
        redirect: false
    }

    backtoMarketClick = () => {
        this.props.deselect()   
        this.setState({redirect: true})
    }

    handleBuyButton = () => {
        const selected = this.props.select
        this.props.purchaseItem(selected, this.props.user);
        debugger
        this.props.addItem(selected.item.name, selected.item.image, selected.item.category_id, this.props.user);
    }

    renderItemInfo=()=>{
        const item = this.props.select.item
        const seller = this.props.select.seller.username
        return(< div > <p>{item.name}</p>
        <img src={item.image} alt={item.name}/>
        <h3>{seller}</h3><p>{item.name}</p>
        <p>{this.props.select.price}</p>
        <button onClick={this.handleBuyButton}>BUY</button>
        <button onClick={this.backtoMarketClick}>Back to Market</button> </div>)
    }
    render(){
        return <div>
    <div className="fakeNavbar" style={{ backgroundColor: "#C95D2D" }} />{this.props.select ? this.renderItemInfo() : <Redirect to="/market" /> }
        </div>
    }
}
function mapStateToProps(state) {
    return { select: state.market.select[0], user: state.user.userId };
}

function mapDispatchToProps(dispatch){
    return {deselect: ()=>dispatch(deselect()),
        purchaseItem: (listing, userId) => dispatch(purchaseItem(listing, userId)),
        addItem: (name, image, catId, userId) => dispatch(addItem(name, image, catId, userId))}
}
export default connect(mapStateToProps, mapDispatchToProps)(Listing)