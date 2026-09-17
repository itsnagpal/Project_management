import { NavLink } from "react-router-dom"
import '../styles/sidebar.css'

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/my-tasks">My Tasks</NavLink>
      <NavLink to="/team">Team</NavLink>
      <NavLink to="/profile">Settings</NavLink>
    </nav>
  )
}