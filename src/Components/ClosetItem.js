import React from 'react'
// import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { selectThisItem, replaceSelectedItem } from "../actions/closetActions";
import { Col, Thumbnail } from "react-bootstrap";

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
    
    
    return <Col className="closet-item" xs={6} md={4} onClick={handleSelectItem}>
          <Thumbnail className="item-img" src={props.image} alt={props.name}>
        <div className="item-info">
            <h4>{props.name}</h4>
            <p>Times Worn: {props.times_worn}</p>
        </div>
          </Thumbnail>
      </Col>;
}


function mapStateToProps(state){
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
