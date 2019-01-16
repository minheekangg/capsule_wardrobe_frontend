import React from 'react'
import { Col, Thumbnail } from "react-bootstrap";

const ClosetItem = props => {
    
    // function renderEachItemInCategory(category){
    //    return props.items.map(i => {
    //         if (i.category_id === category.id){
    //             return renderEachItem(i)
    //         }
    //     })   
    // }

    const renderEachItem = eachItem => {
        return <Col className="closet-item" xs={6} md={4} key={eachItem.id} onClick={() => props.handleSelectItem(eachItem.id, eachItem.category_id)}>
          <Thumbnail className="item-img" src={eachItem.image} alt={eachItem.name}>
            <div className="item-info">
                            <h4>{eachItem.name}</h4>
                             <p>Times Worn: {eachItem.times_worn}</p>
                             <Col md={6}>
                                 <button style={{ color: "#1D4306", border: "none", width: "12vh", marginLeft: "-4vh" }}> Donate </button>
                             </Col>
                             <Col md={6}>
                                 <button style={{ color: "#C95D2D", width: "12vh", marginRight: "4vh" }} > Sell </button>
                             </Col>
                         </div>
                     </Thumbnail>
                 </Col>;
    }

    return (
        <div>
        {props.category.map((c => {
            if (c.items.length > 0) { 
                return (<div className="category-item" key={c.id}>
                    <h5>{c.name}</h5>
                    {sortByTimesWorn(c.items).map(item=>{
                        return renderEachItem(item)} 
                    )}
                </div>)
            }
        }))}
    </div>
    )
}



export default ClosetItem

function sortByTimesWorn(arr) {
    return arr.sort(function (a, b) {
        return a.times_worn - b.times_worn
    })
}
