import { useEffect, useState } from "react"

import TaskForm from "../components/TaskForm"
import { fetchTasks, createTask } from "../services/api"
import TaskList from "../components/TaskList"

function DashboardPage() {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')
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

    const visibleTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.completed;
        }

        if (filter === 'pending') {
            return !task.completed;
        }

        return true;
    })

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
                <>
                    <hr />

                    <div>
                        <button type='button' onClick={() => setFilter('all')}>All</button>
                        <button type='button' onClick={() => setFilter('pending')}>Pending</button>
                        <button type='button' onClick={() => setFilter('completed')}>Completed</button>
                    </div>

                    <TaskList tasks={visibleTasks} />
                </>
            )}


        </section>
    )
}

export default DashboardPage