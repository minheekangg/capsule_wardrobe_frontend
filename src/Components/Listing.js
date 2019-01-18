import React from 'react'
import { connect } from "react-redux";
import { deselect } from "../actions/marketActions";
import { Redirect } from "react-router-dom";

class Listing extends React.Component{
    state={
        redirect: false
    }

    backtoMarketClick = () => {
        this.props.deselect()   
        this.setState({redirect: true})
    }
    render(){
        return (<div>{!this.state.redirect ? <div><p> 
                {this.props.select.item.name}
                </p>
            <button onClick={this.backtoMarketClick}>Back to Market</button> </div> : <Redirect to="/market" /> }
            </div>) 
    }
}
function mapStateToProps(state) {
    return { select: state.market.select[0] };
}

function mapDispatchToProps(dispatch){
    return {deselect: ()=>dispatch(deselect())}
}
export default connect(mapStateToProps, mapDispatchToProps)(Listing)