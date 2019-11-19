import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";

const Login = props =>{

  const [state, setState] = useState({
    credentials: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  });  

  const handleChange = e => {
      setState({
        credentials: {
          ...state.credentials,
          [e.target.name]: e.target.value
        }
      });
    };

  const loginEvent = event => {
      event.preventDefault();
      axios.post('https://wunderlist-2-0-be.herokuapp.com/api/auth/login', state.credentials)
      .then(response => {
          console.log(response);
          const { data } = response;

          localStorage.setItem("token", data.token);
          setState({ ...state, isLoggedIn: true });
          props.history.push('/lists');
      })
  }

  // if (sessionStorage.getItem("token")) {
  //   setState({ ...state, isLoggedIn: true });
  // } else {
  //   setState({ ...state, isLoggedIn: false });
  // }

  return (
    <div>
        <h2>{state.isLoggedIn ? "Logged In" : "Please login"}</h2>
      <form onSubmit={loginEvent}>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={state.credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );

}  

export default Login;