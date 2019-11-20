import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';

const initialItem = {

    title: "",

    completed: false,

};

const Update = props => {

    const {mainForm, setMainForm} = useContext(WunderContext);  
    const [wunder, setWunder] = useState(initialItem);

    console.log(mainForm)
    console.log(props)
    console.log(props.match.params.id)

    const changeHandler = e => {
      e.persist();
      let value = e.target.value;
    //   if (e.target.name === "user_id") {
    //     value = parseInt(value, 10);
    //   }
    setWunder({
        ...wunder,
        [e.target.name]: value
      });
  };

    useEffect(() => {
        // Solves refresh race condition
        console.log(props)
        if (mainForm.length > 0) {
          const newFile = mainForm.find(
            thing => `${thing.id}` === props.match.params.id
          );
          setWunder(newFile);
        }
      }, [mainForm, props.match.params.id]);

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .put(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`, wunder)
        .then(res => {

          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push(`/lists`);
        })
        .catch(err => console.log(err));
    };

  const deleteList = e => {
      e.preventDefault();
      axiosWithAuth()
      .delete(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`)
        .then(res => {

          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push("/lists");
        })
        .catch(error => console.log(error));
    }

    const postNewWunder = arg => {
      const newWunder = {
        id: Date.now(),
        title: arg.title,
        completed: arg.completed
      };
      axiosWithAuth()
        .post(`https://wunderlist-2-0-be.herokuapp.com/api/todo/users/${wunder.id}/tasks`, newWunder )
        .then(response => {
          
          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push("/lists");

        })
        .catch(error => {
          console.log("the data was not posted", error);
        });
    };

    const addHandleSubmit = e => {
      e.preventDefault();
      postNewWunder(wunder);
      //resetting form
      setWunder({ 
        title: "", 
        completed: false, });
      };

// if (mainForm.length === 0) {
//   return <h2>Loading data...</h2>;
// }
console.log(wunder)

return (
    <div>

    <h2>Update or Delete Task</h2>
      <form
       onSubmit={handleSubmit}
       >
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={wunder.title}
        />
        {/* <input
          type="boolean"
          name="completed"
          onChange={changeHandler}
          placeholder="completed"
          value={wunder.completed}
        /> */}
        <button>Update</button>
      </form>

      <button 
        onClick={deleteList}
        >
        Delete
      </button>

    <h2>Add New Task</h2>

    <form
      onSubmit={addHandleSubmit}
    >
      <input
      type="text"
      name="title"
      onChange={changeHandler}
      placeholder="title"
      value={wunder.title}
      />

      {/* <input
      type="boolean"
      name="completed"
      onChange={changeHandler}
      placeholder="enter true or false"
      value={wunder.completed}
      /> */}

      <button>Add</button>
    </form>
    </div>
  );
};

export default Update;