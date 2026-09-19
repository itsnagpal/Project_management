import { useState } from "react"
import { useAuth } from "../context/Authcontext"
import "../styles/profile.css"

export default function Profile() {
  const { currentUser, updateProfile } = useAuth()
  console.log(currentUser)

  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || ""
  })
  const [error, setError] = useState("")
  const [savedMessage, setSavedMessage] = useState("")

  function handleChange(event) {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
    setSavedMessage("")
  }

  function onSubmit(event) {
    event.preventDefault()
    setError("")
    setSavedMessage("")

    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }

    updateProfile({ name: formData.name.trim(), email: formData.email.trim() })
    setSavedMessage("Profile updated successfully")
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-readonly">
          <div className="profile-field">
            <span className="profile-label">Role</span>
            <span className="profile-value">{currentUser.role}</span>
          </div>
          
        </div>

        <form onSubmit={onSubmit} className="profile-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {error && <p className="profile-error">{error}</p>}
          {savedMessage && <p className="profile-success">{savedMessage}</p>}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  )
}