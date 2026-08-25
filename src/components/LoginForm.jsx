import { useState } from 'react'

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setIsSubmitting(true)
            setErrorMessage('')

            await onLogin({
                email,
                password,
            })
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            {errorMessage && <p>{errorMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    )
}

export default LoginForm