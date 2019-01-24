import React from 'react'
import { connect } from "react-redux";
import { deselect, purchaseItem } from "../actions/marketActions";
import { Redirect } from "react-router-dom";
import { addItem } from "../actions/closetActions";
import { Button} from "react-bootstrap";

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
        this.props.addItem(selected.item.name, selected.item.image, selected.item.category_id, this.props.user);
    }

    renderItemInfo=()=>{
        const item = this.props.select.item
        const seller = this.props.select.seller
        return (< div className="donate">
        <img src={item.image} alt={item.name}/>
        
            <p> Seller:  <img style={{ width: "40px", height: "40px", marginRight: "10px",flexShrink: 0 }} src={seller.image} class="circle responsive-img" alt="markeruserimage" />{seller.username}</p>
            <h6>{item.name}</h6>
        <h5>${this.props.select.price}</h5>
            <Button style={{ color: "#1D4306", marginRight: "2vh", width: "20vh"}} onClick={this.handleBuyButton}>BUY</Button> 
            <Button style={{ backgroundColor: "#C95D2D", width: "20vh" }} onClick={this.backtoMarketClick}>Back to Market</Button> </div>)
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