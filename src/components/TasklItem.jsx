function TasklItem({ task, onToggleComplete, onDelete }) {
    return (
        <article>
            <h3>{task.title}</h3>

            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>

            <button type="button" onClick={() => onToggleComplete(task)}>
                {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>

            <button type="button" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </article>
    )
}

export default TasklItem