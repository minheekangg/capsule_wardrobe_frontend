import React, {Fragment} from 'react'
import { Col, Thumbnail } from "react-bootstrap";

const ClosetItem = props => {
    const renderDaysWorn = (updated_at) =>{
        const today = new Date()
        const itemUpdateDate = new Date (updated_at)
        const daysSinceLastWorn = today.getDate() - itemUpdateDate.getDate();
        return <Fragment>
            <p style={{color: "grey"}}>Days since last worn: {daysSinceLastWorn}</p>
            {daysSinceLastWorn > 0 ? <div >
                <Col md={6}> 
                    <button className="item-buttons" style={{ color: "#1D4306"}}>
                    Donate </button>
                </Col>
                <Col md={6}>
                    <button className="item-buttons" style={{ color: "#C95D2D" }}>
                    Sell </button>
                </Col>
              </div> : null}
          </Fragment>;
    }
    

    const renderEachItem = eachItem => {
        return <Col className="closet-item" xs={6} md={4} key={eachItem.id} onClick={() => props.handleSelectItem(eachItem.id, eachItem.category_id)}>
            <Thumbnail className="item-img" src={eachItem.image} alt={eachItem.name}>
              <div className="item-info">
                <h4>{eachItem.name}</h4>
                <p>Times Worn: {eachItem.times_worn}</p>
                {renderDaysWorn(eachItem.updated_at)}
              </div>
            </Thumbnail>
          </Col>;
    }


    const renderContainerWithFilteredCategory = (categoryWithItems) => {
        return <div className="category-item" key={categoryWithItems.id}>
            <h5>{categoryWithItems.name}</h5>
            <div className="category-item-overflow">
                {sortByTimesWorn(categoryWithItems.items).map(item => {
                return renderEachItem(item);
              })}
            </div>
          </div>;
    }

    return (
        <div> {props.category.map((c => {
           return c.items.length > 0 ? renderContainerWithFilteredCategory(c) : null
        }))
        }
        </div>
    )
}



export default ClosetItem

function sortByTimesWorn(arr) {
    return arr.sort(function (a, b) {
        return a.times_worn - b.times_worn
    })
}
