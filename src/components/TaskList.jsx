function TaskList({tasks}) {
    return <section>
        <h2>Your Tasks</h2>

        {tasks.map((task) => (
            <p key={task.id}>
                {task.title} { task.completed ? "(Completed)": "(Pending)"}
            </p>
        ))}
    </section>
}

export default TaskList