import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Register(props) {
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', password: ''});

    const handleChanges = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const submitForm = e => {
        e.preventDefault();
        axiosWithAuth().post('https://wunderlist-2-0-be.herokuapp.com/api/auth/register', user)
            .then(response => {
                props.history.push('/login')
            })
            .catch(error => {
                console.log(error)
                setUser({first_name: '', last_name: '', email: '', password: ''})
            })
    };

    return (
        <div>
            <form onSubmit={submitForm}>
            <input type="text" name="first_name" value={user.first_name} placeholder="First Name" onChange={handleChanges} />
            <input type="text" name="last_name" value={user.last_name} placeholder="Last Name" onChange={handleChanges} />
            <input type="text" name="email" value={user.email} placeholder="Email Address" onChange={handleChanges} />
            <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChanges} />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register