import React, { useState } from 'react';

const UpdateTask = ({ task, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/home/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: editedTask })
      });
      const data = await response.json();
      onUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setEditedTask(event.target.value);
  };

  return (
    <>
      <input type="text" value={editedTask} onChange={handleChange} />
      <button onClick={handleEdit}>Update</button>
    </>
  );
};

export default UpdateTask;