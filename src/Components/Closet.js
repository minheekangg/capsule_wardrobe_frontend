import React from 'react'
import {connect} from 'react-redux';
import { fetchCloset } from '../actions'
import ClosetItem from './ClosetItem';
import Selection from './Selection';
import { Button } from "semantic-ui-react";

class Closet extends React.Component{
    componentDidMount(){
        

        // OLD REACT WAY

        // fetch(url)
        // .then(r => r.json())
        // .then(json => {
            // this.setState({
                // closet: json
            // })
        // })

        // NEW REDUX WAY
        this.props.fetchCloset(this.props.userId);

        // fetchCloset() -> dispatch(some function invocation inside)
        // we need to invoke the function inside 
        // the function inside is your action creator inside actions.js 
        // you import that action creator on line 3 
        // the action creator returns to us the data from the api,
        // nicely formatted into an ACTION 
        // ie: { type: FETCHED_CLOSET, payload: APIDATA }

        // now we have data but need to update redux state 
        // which is where DISPATCH comes in
        // it sends that data to our reducer 
    }
    
    renderCloset(){
        return this.props.items.map(e=>{
           return(<div>
               <ClosetItem key={e.id} image={e.image} name={e.name} id={e.id} times_worn={e.times_worn} />
               </div>)
        })
    }
    renderSelection(){
        return <div>
            <h1>Selected:</h1>
            {this.props.selectedItems.map(e => {
              return <Selection key={e.id} image={e.image} name={e.name} id={e.id} times_worn={e.times_worn} />;
            })}
            <Button>Outfit</Button>
          </div>;
    
    }
    
    render(){
        console.log("inside closet, props are", this.props.selectedItems)
        return(
            <div>
            {this.props.isLoaded ? this.renderCloset() : <div>"not yet"</div>}
            {this.props.selectedItems.length > 0 ? this.renderSelection() : <div>"not yet"</div>}
        </div>
    )
}
}

function mapStateToProps(state){
    // debugger
    return (
       { 
        user: state.user.userId,
        items: state.closet.items,
        isLoaded: state.closet.isLoaded,
        selectedItems: state.closet.selectedItems
        }
    )
}

function mapDispatchToProps(dispatch) {
    // this.setState({
        // items: [...this.state.items, newItem]
    // })

    // dispatch({type: "ADD_ITEM", payload: newItem}) -> hit reducer to update redux state
    return { fetchCloset: (id) => dispatch(fetchCloset(id)) }
}



export default connect(mapStateToProps, mapDispatchToProps)(Closet)