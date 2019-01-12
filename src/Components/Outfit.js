import React from 'react'
import { connect } from 'react-redux';
import withAuth from "../hoc/withAuth";
import { fetchOutfits } from "../actions/outfitActions";

class Outfit extends React.Component {
    componentDidMount(){
       this.props.fetchOutfits()
    }


    render(){
        return (
            <div>ALL THE OUTFITS HEREEEE</div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
        
    }
}


const mapDispatchToProps = { fetchOutfits: fetchOutfits }


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Outfit))