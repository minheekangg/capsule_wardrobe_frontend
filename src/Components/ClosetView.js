import React from 'react'


const ClosetView = props => {

    return <div>
        <button onClick={event=> props.handleViewFilterClick(event)}>View All</button>
        Sort By: < button onClick={event => props.handleViewFilterClick(event)}> Times Worn </button>
      </div>;
}

export default ClosetView