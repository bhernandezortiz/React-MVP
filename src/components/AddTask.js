import React, { useState } from 'react';

const AddTask = ({ setTaskList }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:3000/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
      });
      const data = await response.json();
      setTaskList(taskList => [...taskList, data]);
      window.location.reload();
      setNewTask('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <>
      <input type="text" value={newTask} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </>
  );
};

export default AddTask;
