import { useState } from 'react'

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const trimmedTitle = title.trim()

        if (!trimmedTitle) {
            setErrorMessage('Please enter a task title.')
            setSuccessMessage('')
            return
        }

        try {
            setIsSubmitting(true)
            setErrorMessage('')
            setSuccessMessage('')

            await onTaskCreated({
                title: trimmedTitle,
                completed: false
            })

            setTitle('')
            setSuccessMessage('Task created successfully.')
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
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

            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
        </form>
    )
}

export default TaskForm