import React from 'react';

function SingleList(props) {
    const {id, title, created_at} = props.wList;

function completed (){
    var finished = document.getElementsByClassName('line');
    console.log(finished)
    var finishedArray = Array.from(finished)
    console.log(finishedArray)
    finishedArray.map((e)=>{
        e.addEventListener("click", ()=>{
            e.style.textDecoration ="line-through";
            });
        e.addEventListener("dblclick", ()=>{
            e.style.textDecoration ="none";
            });    
    })
}

    return (
        <div>
            <h2
            className='line'
            onClick={completed}
            >{title}</h2>

            {/* <p>Date: {created_at}</p> */}
            
            {/* <p 
            className='line'
            onClick={completed}  
            >Age: {age}
            </p>

            <p 
            className='line'
            onClick={completed}  
            >Email: {email}
            </p> */}
            
            <button
             onClick={() => props.history.push(`/update/${id}`)}
             >
             Edit
            </button>
        </div>    
    )
}

export default SingleList