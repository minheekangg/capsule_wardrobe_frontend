import React from 'react'


const ClosetView = props => {
    console.log(props)
    return <div> {props.count > 0 ? 
        `You currently have ${props.count} items in your closet!`
      : null}
    </div>
}

export default ClosetView