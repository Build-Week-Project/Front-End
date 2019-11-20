import React from 'react';

function SingleList(props) {
    const {id, title, created_at, completed} = props.wList;
    
// function completedBtn (){
//     var finished = document.getElementsByClassName('line');
//     console.log(finished)
//     var finishedArray = Array.from(finished)
//     console.log(finishedArray)
//     finishedArray.map((e)=>{
//         e.addEventListener("click", ()=>{
//             e.style.textDecoration ="line-through";
//             });
//         e.addEventListener("dblclick", ()=>{
//             e.style.textDecoration ="none";
//             });    
//     })
// }

    return (
        <div>
            <h2
            className='line'
            // onClick={completedBtn}
            style={completed === true ? {textDecoration : "line-through"} : {textDecoration : "none"}}
            >{title}</h2>

            <p>Date: {created_at}</p>
            
            {/* <h3>Completed: {completed}</h3> */}
            
            <button
             onClick={() => props.history.push(`/update/${id}`)}
             >
             Edit
            </button>
        </div>    
    )
}

export default SingleList