import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import SingleList from './SingleList';

function AllLists() {
    const [list, setList] = useState([]);

    useEffect( () => {
        axios.get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
            .then(response => {
                setList(response);
            })
            .catch(error => {
                console.log(error)
            })
            if(!localStorage.getItem('token')) {
                console.error('Not logged in');
            }   else {
                console.info('Logged in.');
            }
    }, []);

    return (
        <div>
            <h1>Wunderlist 2.0</h1>
            {list.map(todo => (
                <div key={todo.id}>
                    <Route render={props => {return <SingleList list={todo} />}} />
                </div>
            ))}
        </div>
    )
}

export default AllLists