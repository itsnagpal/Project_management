import { Navigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"

export default function RoleProtectedRoute({ children, allowedRoutes }) {
  const { currentUser, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if(!allowedRoutes.includes(currentUser.role)){
    return <h1>Not allowed</h1>
  }

  return children
}