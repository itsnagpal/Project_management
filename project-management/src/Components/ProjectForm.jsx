import { useState } from "react"
import { users } from "../data/userMockData"

const emptyProject = {
  name: "",
  description: "",
  priority: "MEDIUM",
  status: "PLANNING",
  startDate: "",
  dueDate: "",
  members: []
}

export default function ProjectForm({ initialProject, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialProject || emptyProject)
  const [error, setError] = useState("")

  function handleChange(event) {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  function toggleMember(userId) {
    setFormData(prev => {
      const isMember = prev.members.includes(userId)
      return {
        ...prev,
        members: isMember
          ? prev.members.filter(id => id !== userId)
          : [...prev.members, userId]
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("Project name is required")
      return
    }
    if (!formData.description.trim()) {
      setError("Description is required")
      return
    }
    if (!formData.startDate || !formData.dueDate) {
      setError("Start date and due date are required")
      return
    }
    if (new Date(formData.dueDate) < new Date(formData.startDate)) {
      setError("Due date cannot be before start date")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <label htmlFor="name">Project Name *</label>
      <input id="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="description">Description *</label>
      <textarea
        id="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      <label htmlFor="priority">Priority *</label>
      <select id="priority" value={formData.priority} onChange={handleChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <label htmlFor="status">Status *</label>
      <select id="status" value={formData.status} onChange={handleChange}>
        <option value="PLANNING">Planning</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <label htmlFor="startDate">Start Date *</label>
      <input
        id="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
      />

      <label htmlFor="dueDate">Due Date *</label>
      <input
        id="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <label>Members</label>
      <div className="member-checkbox-list">
        {users.map(user => (
          <label key={user.id} className="member-checkbox">
            <input
              type="checkbox"
              checked={formData.members.includes(user.id)}
              onChange={() => toggleMember(user.id)}
            />
            {user.name}
          </label>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialProject ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  )
}