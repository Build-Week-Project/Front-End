import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';

const initialItem = {
    
    id: 1,

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

    // useEffect(() => {
    //     // Solves refresh race condition
    //     if (mainForm.length > 0) {
    //       const newFile = mainForm.find(
    //         thing => `${thing.id}` === props.match.params.id
    //       );
    //       setWunder(newFile);
    //     }
    //   }, [mainForm, props.match.params.id]);

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .put(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`, wunder)
        .then(res => {
          // props.setMainForm(res.data);
          props.history.push(`/lists`);
        })
        .catch(err => console.log(err));
  };

  const deleteList = e => {
      e.preventDefault();
      axiosWithAuth()
      .delete(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`)
        .then(res => {
          props.history.push("/lists");
        })
        .catch(error => {
          console.log(error);
        })
    }

// if (mainForm.length === 0) {
//   return <h2>Loading data...</h2>;
// }

console.log(wunder)

return (
    <div>
    <h2>Update To Dos</h2>
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
    </div>
  );
};

export default Update;