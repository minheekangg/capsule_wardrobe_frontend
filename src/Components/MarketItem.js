import React from 'react'

const MarketItem = props =>{

    return !props.item.buyer_id ? <div className="market-listing-item">
        <div className="card">
          <div className="card-image">
                <img className="market-listing-item-img1" src={props.item.item.image} alt={props.item.item.id} />
            <button className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons" onClick={() => props.handleListingInfoClick(props.item)}>
                +
              </i>
            </button>
          </div>
        </div>
        <div className="card-content">
          <p>{props.item.item.name}</p>
          <p>${props.item.price}</p>
        </div>{" "}
      </div> :
            <div className="market-listing-item">
        <div className="card">
            <div className="card-image" style={{ position: "relative", width: "15vh", height: "15vh" }}>
            <img className="market-listing-item-img1" src={props.item.item.image} alt={props.item.item.id} />
            <img className="market-listing-item-img2" src="http://raylittlerealty.com/wp-content/themes/gwenty/images/sold.png" alt={`${props.item.item.id}234}`} />
            </div>
        </div>
        <div className="card-content">
          <p>{props.item.item.name}</p>
          <p>${props.item.price}</p>
        </div>
    </div >
}

export default MarketItem