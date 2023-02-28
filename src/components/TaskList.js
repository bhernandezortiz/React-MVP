import React,{useState} from "react";
import Task from "./Task";
import DeleteButton from "./DeleteButton";
import UpdateTask from "./UpdateTask";
import AddTask from "./AddTask";

const TaskList = ({ taskList, setTaskList }) => {
  const handleDelete = (task) => {
    setTaskList(taskList.filter((t) => t.id !== task.id));
  };

  const[selectedTask,setSelectedTask] = useState(null)

  const handleUpdate = (UpdatedTask) => {
    const updatedTaskList = taskList.map((task)=>
    task.id === UpdatedTask[0].id ? UpdatedTask[0]:task
    );
  setTaskList(updatedTaskList);
  setSelectedTask(null)
  };

  return (
    <div>
        {selectedTask && (
          <UpdateTask task={selectedTask} onUpdate={handleUpdate}/>
        )}
          <AddTask setTaskList={setTaskList}/>
          {taskList.map((task) => (
  <div className='taskList' key={task.id}>
    <Task task={task}/>
    <button onClick={() => setSelectedTask(task)}>Edit</button>
    <DeleteButton task={task} onDelete={handleDelete} />
  </div>
))}
    </div>
  );
};

export default TaskList;
