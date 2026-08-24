import { useState } from 'react'

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        const trimmedTitle = title.trim()

        if (!trimmedTitle) {
            return
        }

        await onTaskCreated({
            title: trimmedTitle,
            completed: false
        })

        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task title</label>

            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder='Enter a task' />

            <button type="submit">Create Task</button>
        </form>
    )
}

export default TaskForm