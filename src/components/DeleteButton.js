import React from "react";

const DeleteButton = ({ task, onDelete }) => {
  const handleClick = () => {
    fetch(`/home/${task.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        onDelete(task);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <button className= 'button' onClick={handleClick}>Delete</button>
  );
};

export default DeleteButton;
