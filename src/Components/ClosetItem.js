import React, {Fragment} from 'react'
import { Col, Thumbnail } from "react-bootstrap";

class ClosetItem extends React.Component {


     renderDaysWorn = (updated_at) =>{
        const today = new Date()
        const itemUpdateDate = new Date(updated_at)
         const daysSinceLastWorn = Math.ceil((Math.abs(today.getTime() - itemUpdateDate.getTime())) / (1000 * 3600 * 24))
        //  console.log("DAYS SINCE LAST WORN", daysSinceLastWorn, itemUpdateDate, today);
        return <Fragment>
            {daysSinceLastWorn > 1 ? <div style={{ "borderStyle": "groove"}}>
            <p style={{color: "grey"}}>Days since last worn: {daysSinceLastWorn}</p>
                <Col md={6}> 
                    <button className="item-buttons" style={{ color: "#1D4306"}}>
                    Donate </button>
                </Col>
                <Col md={6}>
                    <button className="item-buttons" style={{ color: "#C95D2D" }}>
                    Sell </button>
                </Col>
              </div> : 
            null
            }
          </Fragment>;
    }
    

     renderEachItem = itemArr => {
         return sortByTimesWorn(itemArr).map(eachItem=> {
            return(<Col className="closet-item" xs={6} md={4} key={eachItem.id} onClick={() => this.props.handleSelectItem(eachItem.id, eachItem.category_id)}>
                <Thumbnail className="item-img" src={eachItem.image} alt={eachItem.name}>
                <div className="item-info">
                    <h4>{eachItem.name}</h4>
                    <p>Times Worn: {eachItem.times_worn}</p>
                    {this.renderDaysWorn(eachItem.updated_at)}
                </div>
                </Thumbnail>
            </Col>)
         })
    }


     renderContainerWithFilteredCategory = (filteredCategory) => {
         return filteredCategory.map(category=> {
             return <div className="category-item" key={`123${category}`}>
                <h5>{category}</h5>
                <div className="category-item-overflow">
                  {this.renderEachItem(
                    returnArrItemsByCategory(this.props.items, category)
                  )}
                </div>
              </div>;
            })
    }

    

    render(){
        console.log(filterOutCategoryName(this.props.items));
        return (
            <div>
                {(filterOutCategoryName(this.props.items)).length > 0 ? this.renderContainerWithFilteredCategory(filterOutCategoryName(filterByClosetStatus((this.props.items)))) : null }
            </div>
        )
    }
}



export default ClosetItem

function sortByTimesWorn(arr) {
    return arr.sort(function (a, b) {
        return a.times_worn - b.times_worn
    })
}

function filterByClosetStatus(arr) {
    return arr.filter(e=> {
        return e.current_status === "closet"
    })
}

function sortCategoryById(arr) {
  return arr.sort(function(a, b) {
      return a.category_id - b.category_id;
  });
}


// function mapItemsToCatIemHash(arr) {
//     return new Map(arr.map(i => [i.category.name, i]))
// }

function filterOutCategoryName(itemArr){
    console.log(sortCategoryById(itemArr))
    return ((sortCategoryById(itemArr)).map(e => e.category.name)).filter((v, i, a) => a.indexOf(v) === i)
}

function returnArrItemsByCategory(totalItemArr, categoryName){
    return totalItemArr.filter(i => {
        return i.category.name === categoryName;
    });
}