import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { fetchOutfits, faveOutfit} from "../actions/outfitActions";
import {Image} from "react-bootstrap";
import { fetchCloset } from "../actions/closetActions";


class Outfit extends React.Component {
    state = {
        favorite: false
    }

    componentDidMount(){
        this.props.fetchOutfits()
        this.props.fetchCloset(this.props.userId)
    }


    // div className = "outfit-container" key = { o.id } >
    renderOutfits = () => {
        let sorted = sortByDate(this.props.outfits);
        return sorted.map(o => {
            console.log(o)
            return <div class="collection" key={o.id} style={{width:"1280px", marginLeft: "426px", padding: "20px"}}>
                      <span class="title">{o.day}</span>
                        <div class="collection-item avatar">
                        {this.renderEachItemCollection(o.items, o.day)}
                    <p style={{color: "grey"}}>{o.weather} in  {o.location} </p>
                      <button style={{border: "none"}} onClick={() => this.props.faveOutfit(this.props.user, o.id, o.favorite)} class="secondary-content">
                        {o.favorite ? <i class="material-icons">grade</i> : <i class="material-icons">star_border</i>}
                      
                      </button>
                </div>
            </div>
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
                {this.props.isLoaded || this.props.updatedOutfit ? this.renderOutfits() : null }
            </div>
        )
    }
}


function mapStateToProps(state) {
    // console.log('%csfdfsd', 'color: pink', state)
    return {
        outfits: state.outfit.outfits,
        items: state.closet.items,
        user: state.user.userId,
        isLoaded: state.outfit.outfitsLoaded,
        createdOutfit: state.outfit.createdOutfit,
        updatedOutfit: state.outfit.updatedOutfit
    }
}


const mapDispatchToProps = dispatch => {
  return {
      fetchOutfits: () => dispatch(fetchOutfits()),
      fetchCloset: id => dispatch(fetchCloset(id)),
      faveOutfit: (userId, outfitId, favorite) => dispatch(faveOutfit(userId, outfitId, favorite)),
      
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
