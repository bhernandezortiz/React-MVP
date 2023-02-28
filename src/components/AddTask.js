import React, { useState } from 'react';
import TaskList from './TaskList';

const AddTask = ({ setTaskList }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = async () => {
    try {
    //   const response = 
    await fetch('/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
      });
    //   const data = await response.json();
    //   setTaskList(taskList => [...taskList, data]);
    //   window.location.reload();
    //   setNewTask('');
    const getData=await fetch('/home')
    const data = await getData.json()
    setTaskList(data)
    setNewTask('')
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
      <button className="button" onClick={handleAdd}>Add Task</button>
    </>
  );
};

export default AddTask;
