import React from 'react'
import { Card, Image } from "semantic-ui-react";

const Selection = (props) => {
    return (
        <Card style={{size: "50%"}} >
            <Image src={props.image} />
        </Card>
    )
}

export default Selection