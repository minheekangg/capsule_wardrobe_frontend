import React from 'react'

const MarketItem = props =>{

    return <div className="listing-item" onClick={()=>props.handleListingInfoClick(props.item)}>
        <img src={props.item.item.image} alt={props.item.item.id} />
        <p>{props.item.item.name}</p>
        <p>{props.item.price}</p>
        <p>{!props.item.buyer_id ? "TOSELL" : "SOLD"}</p>
      </div>;
}

export default MarketItem