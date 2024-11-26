import React from 'react'

const Card = ({
    id='',
    description="no description",
    createdBy="no data provided",
    priority='low',
    onDelete,
}) => {
  const colorUsed=()=>{
    if(priority.toLowerCase()==='low')
      return "#84d884";
    else if(priority.toLowerCase()==='medium')
      return "#dfa741";
    else{
      return "rgb(223 89 65)";
    }
    
  }
  // console.log(colorUsed);
  return (
    <div style={{border:"2px solid black", margin:"5px",padding:"5px", width:"150px", height:"200px", backgroundColor:colorUsed()}}>
      <p style={{height:"80px",overflow:"auto"}}>{description}</p>
      <p>Created by:{createdBy}</p>
      <p>Priority : {priority}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Card
