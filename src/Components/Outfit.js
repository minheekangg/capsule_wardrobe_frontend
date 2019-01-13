import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { fetchOutfits } from "../actions/outfitActions";
import { Card, Image } from "semantic-ui-react";
import { fetchCloset } from "../actions/closetActions";

class Outfit extends React.Component {
    componentDidMount(){
       this.props.fetchOutfits()
     this.props.fetchCloset(this.props.userId)
    }

    renderOutfits = () => {
        console.log(this.props.outfits)
        // debugger
        // <Card.Group itemsPerRow={4} items={"fsdfd"} />
        return this.props.outfits.map(o=>{
            return <Card key={o.id}>
                <Card.Header key={o.id}>{o.day}</Card.Header>
                {this.renderEachItemCollection(o.items, o.day)}
              </Card>;
                  
            })
        }

    renderEachItemCollection = (itemsArr, outfitDay) => {
        return itemsArr.map(i=>{
            return <Image key={(outfitDay + i.id)} src={i.image}  />
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