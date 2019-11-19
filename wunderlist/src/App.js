import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import AllLists from './components/AllLists';
import SingleList from './components/SingleList';
import WunderContext from './contexts/WunderContext';
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const [mainForm, setMainForm] = useState([]);

    useEffect( () => {
      axiosWithAuth().get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
              // setWunderlist(response.data.tasks);
              setMainForm(response.data.tasks);
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
  <WunderContext.Provider value={{mainForm, setMainForm}}>	   
    <Router>
      <div className="App">
      <Link to='/register'
      // style={!localStorage.getItem('token') ? {} : { display: 'none' }}
      >Register</Link>
      <br/>
      <Link to='/login'
      // style={!localStorage.getItem('token') ? {} : { display: 'none' }}
      >Login</Link>
      <br/>
      {/* <Link 
      // onClick= {localStorage.clear()} to='/login'
      // style={localStorage.getItem('token') ? {} : { display: 'none' }}
      >Log out</Link> */}
      <br/>
      <Link to="/lists">Home</Link>
      </div>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute exact path="/lists" component={AllLists}/>
        <Route
          path="/update/:id"
          render={props => {
          return <Update {...props}/>
          }}  
          /> 
        {/* <Route
        path="/todo/tasks/:id"
        render={props => {
          return <SingleList {...props}/>;
        }}  
      />   */}
      </Switch>
    </Router>
  </WunderContext.Provider>    
  );
}

export default App;
