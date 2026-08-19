import { useEffect, useState } from "react"
import { fetchTasks } from "../services/api"

function DashboardPage() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const data = await fetchTasks()
            setTasks(data)
        }

        loadTasks()
    }, [])

    return (
        <section>
            <h2>Your Dashboard</h2>

            {tasks.map((task) => (
                <p key={task.id}>
                    {task.title} {task.completed ? "(Completed)" : "(Pending)"}
                </p>
            ))}
        </section>
    )
}

export default DashboardPage