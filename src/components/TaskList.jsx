import '../styles/taskList.css';

function TaskList({ tasks }) {
    return (
        <div className='task-list'>
            <section>
                {tasks.map((task) => (
                    <article key={task.id}>
                        <p>{task.title}</p>
                        <p>{task.completed ? '(Completed)' : '(Pending)'}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}

export default TaskList