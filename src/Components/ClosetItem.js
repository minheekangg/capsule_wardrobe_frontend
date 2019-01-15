import React from 'react'
import { Col, Thumbnail } from "react-bootstrap";

const ClosetItem = props => {
    return <div>
        {props.items.map(eachItem => {
          return <Col className="closet-item" xs={6} md={4} onClick={() => props.handleSelectItem(eachItem.id, eachItem.category_id)}>
              <Thumbnail className="item-img" src={eachItem.image} alt={eachItem.name}>
                <div className="item-info">
                  <h4>{eachItem.name}</h4>
                  <p>Times Worn: {eachItem.times_worn}</p>
                  <Col md={6}>
                    <button
                      style={{
                        color: "#1D4306",
                        border: "none",
                        width: "12vh",
                        marginLeft: "-4vh"
                      }}
                    >
                      Donate
                    </button>
                  </Col>
                  <Col md={6}>
                    <button
                      style={{
                        color: "#C95D2D",
                        width: "12vh",
                        marginRight: "4vh"
                      }}
                    >
                      {" "}
                      Sell
                    </button>
                  </Col>
                </div>
              </Thumbnail>
            </Col>;
        })}
      </div>;
}



export default ClosetItem
