import { Link, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/register">Register</Link>{" "}
        <Link to="/login">Login</Link>{" "}
        <Link to="/dashboard">Dashboard</Link>{" "}
      </nav>

      <h1>Task Management Application</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </main>
  )
}

export default App;