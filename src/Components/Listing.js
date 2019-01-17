import React from 'react'
import { connect } from "react-redux";

const Listing = props => {
    console.log("asdfnalksdjflkdajsf", props)
    return(
        <div>{props.selectedListing.items.name}</div>
    )
}
function mapStateToProps(state) {
    console.log(state)
    return { selectedListing: state.market.selectListing };
}
export default connect(mapStateToProps)(Listing)