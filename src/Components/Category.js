import React from 'react'


const Category = props => {
  const category = () => {
      return <ul> {props.category.map( c => {
          return (<li key={c.name}>{c.name}</li>) 
      })
      }</ul>
    }
     
    return(
        <div>
           {props.category.length > 0 ?  
             category() : null
            } 
        </div>
    )
}

export default Category