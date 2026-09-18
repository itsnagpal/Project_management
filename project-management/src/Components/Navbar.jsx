import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"
import '../styles/navbar.css'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="navbar">
      <span className="navbar-brand">ProjectHub</span>
      <div className="navbar-user">
        <span>{currentUser.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}