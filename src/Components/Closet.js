import React from 'react'
import {connect} from 'react-redux';
import { fetchCloset } from '../actions'
import ClosetItem from './ClosetItem';
import Selection from './Selection';
import { Button } from "semantic-ui-react";

class Closet extends React.Component{
    componentDidMount(){
        this.props.fetchCloset(this.props.userId);
    }
    
    renderCloset(){
        return this.props.items.map(e=>{
           return(<div>
               <ClosetItem key={e.id} image={e.image} name={e.name} id={e.id} times_worn={e.times_worn} category={e.category_id} />
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
    return { fetchCloset: (id) => dispatch(fetchCloset(id)) }
}



export default connect(mapStateToProps, mapDispatchToProps)(Closet)