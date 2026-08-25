import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { isAuthenticated, logoutUser } from "./services/api";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import './styles/mainNav.css';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const navigate = useNavigate()
  const loggedIn = isAuthenticated()

  function handleLogout() {
    logoutUser();
    navigate("/login")
  }

  return (
    <main>
      <nav>
        <Link to="/">Home</Link>
        {loggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}


      </nav>

      <h1>Task Management Application</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  )
}

export default App;