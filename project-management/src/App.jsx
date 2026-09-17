import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../src/context/Authcontext"
import ProtectedRoute from "./Components/ProtectedRoute"
import Layout from "./Components/Layout"
import Login from "./Components/Login"

const Dashboard = lazy(() => import("./Components/Dashboard"))

function NotFound() {
  return <h2>404 - Page Not Found</h2>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}