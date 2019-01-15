import React from 'react'


const Category = props => {
    console.log(props)
  const renderCategory = () => {
      return <ul> {props.category.map( c => {
          return (<button key={c.name} onClick={e=> props.handleFilterCategory(e, c.name)}>{c.name}</button>) 
      })
      }</ul>
    }
     
    return(
        <div>
            View All
           {props.category.length > 0 ?  
             renderCategory() : null
            } 
        </div>
    )
}

export default Category