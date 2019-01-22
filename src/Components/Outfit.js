import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { fetchOutfits, faveOutfit } from "../actions/outfitActions";
import {Image} from "react-bootstrap";
import { fetchCloset } from "../actions/closetActions";
import favoriteImg from '../images/favorite.png'
import starImg from '../images/star.png'

class Outfit extends React.Component {
    state = {
        favorite: false
    }

    componentDidMount(){
       this.props.fetchOutfits()
     this.props.fetchCloset(this.props.userId)
    }

    renderOutfits = () => {
        let sorted = sortByDate(this.props.outfits);
        return sorted.map(o => {
          return <div className="outfit-container" key={o.id}>
              <h6 key={o.id}>{o.day}
                  <button onClick={()=>this.props.faveOutfit(this.props.user, o.id, o.favorite)}  style={{border: "none"}}>
         {o.favorite ? <img src={favoriteImg} alt="favorite"/> : <img src={starImg} alt="star" /> }
                  </button>
              </h6>
              {this.renderEachItemCollection(o.items, o.day)}
            </div>;
        });
    }
   
        
    renderEachItemCollection = (itemsArr, outfitDay) => {
        return sortCategoryById(itemsArr).map(i => {
          return <Image key={outfitDay + i.id} src={i.image} style={{ height: "20vh", width: "20vh", margin: ".5vh" }} />;
        });

    }

    render(){
        return (
            <div>
                <div className="fakeNavbar" style={{ backgroundColor: "#1D4306" }} />
            { this.props.createdOutfit || this.props.isLoaded ? this.renderOutfits() : null }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('%csfdfsd', 'color: pink', state)
    return {
        outfits: state.outfit.outfits,
        items: state.closet.items,
        user: state.user.userId,
        isLoaded: state.outfit.outfitsLoaded,
        createdOutfit: state.outfit.createdOutfit
    }
}


const mapDispatchToProps = dispatch => {
  return {
      fetchOutfits: () => dispatch(fetchOutfits()),
      fetchCloset: id => dispatch(fetchCloset(id)),
      faveOutfit: (userId, outfitId, favorite) => dispatch(faveOutfit(userId, outfitId, favorite))
  }
};


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Outfit))

//HELPER METHOD
const sortByDate = (arr) => {
   return arr.sort(function (a, b) {
       return new Date(b.day) - new Date(a.day);
    })
}


function sortCategoryById(arr) {
    return arr.sort(function (a, b) {
        return a.category_id - b.category_id;
    });
}
