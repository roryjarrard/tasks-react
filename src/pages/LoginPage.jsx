import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/api"
import LoginForm from "../components/LoginForm"

function LoginPage() {
    const navigate = useNavigate()

    async function handleLogin(loginData) {
        const data = await loginUser(loginData)
        localStorage.setItem('access_token', data.access_token)
        navigate('/dashboard')
    }

    return (
        <section>
            <h2>Log In</h2>
            <LoginForm onLogin={handleLogin} />
        </section>
    )
}

export default LoginPage