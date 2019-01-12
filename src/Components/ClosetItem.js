import React from 'react'
import { Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectThisItem, replaceSelectedItem } from "../actions/closetActions";

const ClosetItem = props => {

    const handleSelectItem = () =>{
        const category = props.selected.map( s => {
            return (s.category_id)
        } )
        if( category.includes(props.category_id)){
            const toBeReplaced = props.selected.find(s=>s.category_id === props.category_id)
            props.replaceSelectedItem(props.id, toBeReplaced.id)
        } else {
            props.selectThisItem(props.id) 
        }
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
    console.log("SELECTED ITEMS FROM CLOSET ITEM", state.closet.selectedItems)
    return {
        selected: state.closet.selectedItems
    }
}

function mapDispatchToProps(dispatch) {
    return { selectThisItem: id => dispatch(selectThisItem(id)), replaceSelectedItem: (newId, oldId) => dispatch(replaceSelectedItem(newId, oldId)) };
}

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClosetItem)
