import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../src/context/Authcontext"
import { ProjectProvider } from "./context/ProjectContext"
import ProtectedRoute from "./Components/ProtectedRoute"
import Layout from "./Components/Layout"
import Login from "./Components/Login"
import AdminDashboard from "./Components/AdminDashboard"

const Dashboard = lazy(() => import("./Components/Dashboard"))

function NotFound() {
  return <h2>404 - Page Not Found</h2>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ProjectProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/admin"
                element={
                  <ProtectedRoute allowedRoutes={["admin"]}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
              </Route>

              <Route path="/user"
                element={
                  <ProtectedRoute allowedRoutes={["user"]}>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard/>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}