import React from 'react'
import { Card, Image } from "semantic-ui-react";

const Selection = (props) => {
    console.log('%c selection', 'color: pink', "hi")
    return (
        <Card >
            <Image src={props.image} />
        </Card>
    )
}

export default Selection