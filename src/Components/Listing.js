import React from 'react'
import { connect } from "react-redux";

const Listing = props => {
    console.log("asdfnalksdjflkdajsf", props)
    return(
        <div>{props.select.item.name}</div>
    )
}
function mapStateToProps(state) {
    return { select: state.market.select[0] };
}
export default connect(mapStateToProps)(Listing)