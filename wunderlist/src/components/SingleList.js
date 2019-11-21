import React from 'react';

function SingleList(props) {
    const {name, age, email, id} = props.list;

    return (
        <div>
            <h2>Name: {name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <p>id: {id}</p>
        </div>
    )
}

export default SingleList