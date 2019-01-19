import React, {Fragment} from 'react'
import { Col, Thumbnail } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { selectItemToDelete, selectItemStatus } from "../actions/closetActions";
import { connect } from 'react-redux';

class ClosetItem extends React.Component {

     renderDaysWorn = (item) =>{
        const today = new Date()
        const itemUpdateDate = new Date(item.updated_at)
         const daysSinceLastWorn = Math.ceil((Math.abs(today.getTime() - itemUpdateDate.getTime())) / (1000 * 3600 * 24))
        //  console.log("DAYS SINCE LAST WORN", daysSinceLastWorn, itemUpdateDate, today);
        return <Fragment>
            {daysSinceLastWorn > 1 ? <div style={{ "borderStyle": "groove"}}>
            <p style={{color: "grey"}}>Days since last worn: {daysSinceLastWorn}</p>
                <Col md={6}> 
                    <button to="./donate" className="item-buttons" style={{ color: "#1D4306"}} onClick={(e)=>this.redirectDonateOrSell(e,item.id)}>
                    Donate </button>
                </Col>
                <Col md={6}>
                    <button className="item-buttons" style={{ color: "#C95D2D" }} onClick={(e) => this.redirectDonateOrSell(e, item.id)}>
                    Sell </button>
                </Col>
              </div> : 
            null
            }
          </Fragment>;
    }

    redirectDonateOrSell = (event, id) => {
        this.props.selectItemToDelete(id)
        this.props.selectItemStatus(event.target.innerText)
    }
    

     renderEachItem = itemArr => {
         return sortByTimesWorn(itemArr).map(eachItem=> {
            return(<Col className="closet-item" xs={6} md={4} key={eachItem.id} >
                <Thumbnail className="item-img" src={eachItem.image} alt={eachItem.name} onClick={() => this.props.handleSelectItem(eachItem.id, eachItem.category_id)}>
                <div className="item-info">
                    <h4>{eachItem.name}</h4>
                    <p>Times Worn: {eachItem.times_worn}</p>
                    {this.renderDaysWorn(eachItem)}
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

    renderBasedOnItemToDeleteStatus = () => {
        if (this.props.itemToDeleteStatus === "Donate") {
            return <Redirect to="/donate" />
        } else if (this.props.itemToDeleteStatus === "Sell") {
            return <Redirect to="/sell" />;
        } else {
            return filterOutCategoryName(this.props.items).length > 0 ? this.renderContainerWithFilteredCategory(filterOutCategoryName(filterByClosetStatus(this.props.items))) : null;
        }
    }

    render(){
        return (
            <div>
                {this.renderBasedOnItemToDeleteStatus()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{itemToDeleteStatus: state.closet.itemToDeleteStatus}
}

const mapDispatchToProps = dispatch => {
    return { selectItemToDelete: (id) => dispatch(selectItemToDelete(id)), selectItemStatus: (status) => dispatch(selectItemStatus(status)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClosetItem)


//HELPER METHODS BELOW:
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

function filterOutCategoryName(itemArr){
    return ((sortCategoryById(itemArr)).map(e => e.category.name)).filter((v, i, a) => a.indexOf(v) === i)
}

function returnArrItemsByCategory(totalItemArr, categoryName){
    return totalItemArr.filter(i => {
        return i.category.name === categoryName;
    });
}