import { NavLink } from "react-router-dom"
import { useAuth } from "../context/Authcontext"
import '../styles/sidebar.css'

export default function Sidebar() {
  const { currentUser } = useAuth()
  
  return (
    <>
      {currentUser?.role === "admin" && (
        <nav className="sidebar"> 
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/projects">Projects</NavLink>
          {/* <NavLink to="/admin/my-tasks">My Tasks</NavLink> */}
          <NavLink to="/admin/team">Team</NavLink>
          <NavLink to="/admin/profile">Settings</NavLink>
        </nav>
      )}

      {currentUser?.role === "user" && (
        <nav className="sidebar"> 
          <NavLink to="/user/dashboard">Dashboard</NavLink>
          <NavLink to="/user/projects">My Projects</NavLink>
          <NavLink to="/user/my-tasks">My Tasks</NavLink>
          <NavLink to="/user/profile">Profile</NavLink>
        </nav>
      )}
    </> 
  )
}