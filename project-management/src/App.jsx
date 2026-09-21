import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "../src/context/Authcontext"
import { ProjectProvider } from "./context/ProjectContext"
import ProtectedRoute from "./Components/ProtectedRoute"
import Layout from "./Components/Layout"
import Login from "./Components/Login"
import UserDashboard from "./user-pages/UserDashboard"
import MyProjects from "./user-pages/MyProjects"
import MyTasks from "./user-pages/MyTask"
import Profile from "./Components/Profile"
import AllProjects from "./admin-pages/AllProjects"
import { useAuth } from "../src/context/Authcontext"

const Dashboard = lazy(() => import("./admin-pages/Dashboard"))


function NotFound() {
  return <h2>404 - Page Not Found</h2>
}

function HomeRedirect() {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  if (currentUser.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />
  }
  return <Navigate to="/user/dashboard" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ProjectProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<HomeRedirect/>}/>
              <Route path="/login" element={<Login />} />

              <Route path="/admin"
                element={
                  <ProtectedRoute allowedRoutes={["admin"]}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile/>}/>
                <Route path="projects" element={<AllProjects/>}/>

              </Route>

              <Route path="/user"
                element={
                  <ProtectedRoute allowedRoutes={["user"]}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<UserDashboard/>} />
                <Route path="projects" element={<MyProjects/>}/>
                <Route path="my-tasks" element={<MyTasks/>}/>
                <Route path="profile" element={<Profile/>}/>

              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}