import React from 'react'
import { connect } from 'react-redux';
import { deselectThisItem } from "../actions/closetActions";

const Selection = (props) => {

    const removeItem = (id) =>{
        props.deselectThisItem(id)
    }

    return<img onClick={()=>removeItem( props.id)} className="selected-item" src={props.image} alt={props.id} />

     
}

const mapDispatchToProps = dispatch =>{
    return { deselectThisItem: id => dispatch(deselectThisItem(id)) };
}

export default connect(null, mapDispatchToProps)(Selection)