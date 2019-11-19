import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';

const initialItem = {

    title: "",

    completed: false,
};

function AllLists() {

    const {mainForm, setMainForm} = useContext(WunderContext);

    // const [wunderlist, setWunderlist] = useState([]);  

    // useEffect( () => {
    //     axiosWithAuth().get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
    //         .then(response => {
    //             // setWunderlist(response.data.tasks);
    //             setMainForm(response.data.tasks);
    //             console.log(response.data.tasks);
    //             console.log(mainForm);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         if(!localStorage.getItem('token')) {
    //             console.error('Not logged in');
    //         }   else {
    //             console.info('Logged in.');
    //         }
    // }, []);
    
    return (
        <div>
            <h1>Wunderlist 2.0</h1>

            {mainForm.map(todo => (
                <div 
                key={todo.id}
                >
                    {/* <WunderDetails  todo={todo} /> */}
                    <Route render={props => {return <SingleList {...props} wList={todo} />}} />
                </div>
            ))}
        </div>
    )
}

// function WunderDetails({ todo }) {
//     return (
//       <Link to={`/todo/tasks/${todo.id}`}>
//         <SingleList todo={todo} />
//       </Link>
//     );
// }

export default AllLists