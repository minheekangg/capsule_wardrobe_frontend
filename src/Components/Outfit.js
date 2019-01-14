import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { fetchOutfits } from "../actions/outfitActions";
import {Carousel, Caption, Item, Image} from "react-bootstrap";
import { fetchCloset } from "../actions/closetActions";

class Outfit extends React.Component {

    componentDidMount(){
       this.props.fetchOutfits()
     this.props.fetchCloset(this.props.userId)
    }

    renderOutfits = () => {
        let sorted = sortByDate(this.props.outfits);
        return sorted.map(o => {
          return <div className="outfit-container" key={o.id}>
              <h5 key={o.id}>{o.day}</h5>
              {this.renderEachItemCollection(o.items, o.day)}
            </div>;
        });
    }
   
        
    renderEachItemCollection = (itemsArr, outfitDay) => {
        return itemsArr.map(i=>{
            return <Image key={(outfitDay + i.id)} src={i.image}  style={{height: "20vh", width: "20vh"}} />
        })

    }

    render(){
        return (
            <div>
            { this.props.outfits.length > 0 ? this.renderOutfits() : null }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('%csfdfsd', 'color: pink', state)
    return {
        outfits: state.outfit.outfits,
        items: state.closet.items
    }
}


const mapDispatchToProps = dispatch => {
  return {
      fetchOutfits: () => dispatch(fetchOutfits()),
      fetchCloset: id => dispatch(fetchCloset(id))
  }
};


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Outfit))

//HELPER METHOD
const sortByDate = (arr) => {
   return arr.sort(function (a, b) {
       return new Date(b.day) - new Date(a.day);
    })
}