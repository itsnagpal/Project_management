import { useState } from "react"
import { users } from "../data/userMockData"

function emptyTask(projectId) {
  return {
    projectId,
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assignedTo: "",
    dueDate: ""
  }
}

export default function TaskForm({
  projectId,
  projectMembers,
  initialTask,
  onSubmit,
  onCancel
}) {
  const [formData, setFormData] = useState(
    initialTask || emptyTask(projectId)
  )
  const [error, setError] = useState("")

  const assignableUsers = users.filter(u => projectMembers.includes(u.id))

  function handleChange(event) {
    const { id, value } = event.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!formData.title.trim()) {
      setError("Task title is required")
      return
    }
    if (!formData.assignedTo) {
      setError("Please assign this task to someone")
      return
    }
    if (!formData.dueDate) {
      setError("Due date is required")
      return
    }

    onSubmit({ ...formData, assignedTo: Number(formData.assignedTo) })
  }

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <label htmlFor="title">Task Title *</label>
      <input id="title" value={formData.title} onChange={handleChange} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      <label htmlFor="status">Status</label>
      <select id="status" value={formData.status} onChange={handleChange}>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <label htmlFor="priority">Priority</label>
      <select id="priority" value={formData.priority} onChange={handleChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <label htmlFor="assignedTo">Assign To *</label>
      <select
        id="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
      >
        <option value="">Select a member</option>
        {assignableUsers.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <label htmlFor="dueDate">Due Date *</label>
      <input
        id="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialTask ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  )
}