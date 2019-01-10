import React from 'react'
import { Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectThisItem } from "../actions";

const ClosetItem = ({image, name, times_worn, id, selectThisItem}) => {
    return (
        <Card onClick={()=>{selectThisItem(id)}} >
            <Image src={image} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className='date'>Times Worn: {times_worn}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return { 
        selectThisItem: id => dispatch(selectThisItem(id))
     }
}

export default connect(null, mapDispatchToProps)(ClosetItem)