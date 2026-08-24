import { useEffect, useState } from "react"

import TaskForm from "../components/TaskForm"
import { fetchTasks, createTask } from "../services/api"

function DashboardPage() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const data = await fetchTasks()
            setTasks(data)
        }

        loadTasks()
    }, [])

    async function handleTaskCreated(taskData) {
        const newTask = await createTask(taskData)
        setTasks((currentTasks) => [...currentTasks, newTask])
    }

    return (
        <section>
            <h2>Your Dashboard</h2>

            <TaskForm onTaskCreated={handleTaskCreated} />

            {tasks.map((task) => (
                <p key={task.id}>
                    {task.title} {task.completed ? "(Completed)" : "(Pending)"}
                </p>
            ))}
        </section>
    )
}

export default DashboardPage