import { useEffect, useState } from "react"

import TaskForm from "../components/TaskForm"
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api"
import TaskList from "../components/TaskList"

function DashboardPage() {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [actionError, setActionError] = useState('')

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

    async function handleToggleComplete(task) {
        try {
            setActionError('')

            const updatedTask = await updateTask(task.id, {
                title: task.title,
                completed: !task.completed,
            })

            setTasks((currentTasks) =>
                currentTasks.map((item) =>
                    item.id === updatedTask.id ? updatedTask : item
                )
            )
        } catch (error) {
            setActionError(error.message)
        }
    }

    async function handleDeleteTask(taskId) {
        try {
            setActionError('')

            await deleteTask(taskId)

            setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
        } catch (error) {
            setActionError(error.message)
        }
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

            <hr />

            <div>
                <button type='button' onClick={() => setFilter('all')}>All</button>
                <button type='button' onClick={() => setFilter('pending')}>Pending</button>
                <button type='button' onClick={() => setFilter('completed')}>Completed</button>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks found yet. Create your first task to get started.</p>
            ) : visibleTasks.length === 0 ? (
                <p>No tasks match the selected filter.</p>
            ) :
                (
                    <>
                        {actionError && <p>{actionError}</p>}

                        <TaskList
                            tasks={visibleTasks}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDeleteTask}
                        />
                    </>
                )}


        </section>
    )
}

export default DashboardPage