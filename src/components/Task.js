const Task = ({task}) => {
    return (
        <h1 id={task.id}>{task.task}</h1>
    )
}

export default Task