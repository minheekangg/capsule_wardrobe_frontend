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

        // return <Carousel> {[1,2,3,4,5].map((e)=> {return <Carousel.Item>
        //         <img width={900} height={500} alt="900x500" src="/carousel.png" />
        //         <Carousel.Caption>
        //             <h3>First slide label</h3>
        //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>}
        // )}
        // </Carousel>
    renderOutfits = () => {
        const sortedOutfitsByDate = this.props.outfits.sort(function (a, b) {
            return a.day - b.day;
        })
        return sortedOutfitsByDate.map(o => {
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