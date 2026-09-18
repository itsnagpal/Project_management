import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleChange(event) {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    setError("")

    const result = login(formData.email, formData.password)

    if (result.success) {
      if(result.user.role === "admin"){
        navigate("/admin/dashboard")
      }
      if (result.user.role ==="user"){
        navigate("/user/dashboard")
      }
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}