import TasklItem from './TasklItem';

import '../styles/taskList.css';

function TaskList({ tasks, onToggleComplete, onDelete }) {
    return (
        <section>
            {tasks.map((task) => (
                <TasklItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </section>
    )
}

export default TaskList