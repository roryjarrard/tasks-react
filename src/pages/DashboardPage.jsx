import { useEffect, useState } from "react"

import TaskForm from "../components/TaskForm"
import { fetchTasks, createTask } from "../services/api"

function DashboardPage() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await fetchTasks()
                setTasks(data)
                setErrorMessage('')
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadTasks()
    }, [])

    async function handleTaskCreated(taskData) {
        const newTask = await createTask(taskData)
        setTasks((currentTasks) => [...currentTasks, newTask])
    }

    if (isLoading) {
        return <p>Loading tasks...</p>
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>
    }

    return (
        <section>
            <h2>Your Dashboard</h2>

            {errorMessage && <p>{errorMessage}</p>}

            <TaskForm onTaskCreated={handleTaskCreated} />

            {tasks.length === 0 ? (
                <p>No tasks found yet. Create your first task to get started.</p>
            ) : (
                tasks.map((task) => (
                    <p key={task.id}>
                        {task.title} {task.completed ? "(Completed)" : "(Pending)"}
                    </p>
                ))
            )}


        </section>
    )
}

export default DashboardPage