import React from 'react'
import { Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectThisItem } from "../actions";

const ClosetItem = props => {

    const handleSelectItem = () =>{
        const category = props.selected.map( s => {
            return (s.category_id)
        } )
        return !category.includes(props.category) ? props.selectThisItem(props.id) : null
    }

    return (
        <Card onClick={handleSelectItem} >
            <Image src={props.image} />
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>Times Worn: {props.times_worn}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

function mapStateToProps(state){
    return {
        selected: state.closet.selectedItems
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        selectThisItem: id => dispatch(selectThisItem(id))
     }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClosetItem);