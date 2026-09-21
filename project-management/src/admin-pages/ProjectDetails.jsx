import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProject } from "../context/ProjectContext"
import { users } from "../data/userMockData"
import { TaskCard } from "../Components/Card"
import Modal from "../Components/Modal"
import TaskForm from "../Components/TaskForm"
import "../styles/form.css"

function formatStatus(status) {
  return status
    .toLowerCase()
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, tasks, updateTask, deleteTask, addTask } = useProject()

  const [modalMode, setModalMode] = useState(null) 
  const [editingTask, setEditingTask] = useState(null)

  const project = projects.find(p => p.id === Number(id))
//   console.log(useParams())
//   console.log(id)
//   console.log(project)
//   console.log(projects)

  if (!project) {
    return (
      <div className="project-details-page">
        <p className="empty-state">Project not found.</p>
        <button className="btn-secondary" onClick={() => navigate("/admin/projects")}>
          Back to Projects
        </button>
      </div>
    )
  }

  const members = users.filter(u => project.members.includes(u.id))
  const sortOrder = {
    "Completed":3,
    "In Progress":2,
    "Todo":3
  }
  const projectTasks = tasks.filter(t => t.projectId === project.id && t.status !== "COMPLETED")
  console.log(projectTasks)

  function openCreateModal() {
    setEditingTask(null)
    setModalMode("create")
  }

  function openEditModal(task) {
    setEditingTask(task)
    setModalMode("edit")
  }

  function closeModal() {
    setModalMode(null)
    setEditingTask(null)
  }

  function handleFormSubmit(formData) {
    if (modalMode === "edit") {
      updateTask(editingTask.id, formData)
    } else {
      addTask(formData)
    }
    closeModal()
  }

  function handleToggleComplete(task) {
    updateTask(task.id, {
      status: task.status === "COMPLETED" ? "TODO" : "COMPLETED"
    })
  }

  function handleDeleteTask(task) {
    const confirmed = window.confirm(`Delete task "${task.title}"?`)
    if (confirmed) {
      deleteTask(task.id)
    }
  }
  return (
    <div className="project-details-page">
      <button className="btn-secondary" onClick={() => navigate("/admin/projects")}>
        ← Back to Projects
      </button>

      <div className="project-details-header">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className="app-card-meta">
          <span className={`status-badge status-${project.status.toLowerCase()}`}>
            {formatStatus(project.status)}
          </span>
          <span className={`priority-tag priority-${project.priority.toLowerCase()}`}>
            {formatStatus(project.priority)} priority
          </span>
          <span className="app-card-due">Due {project.dueDate}</span>
        </div>
      </div>

      <section>
        <h2>Team</h2>
        {members.length === 0 ? (
          <p className="empty-state">No members assigned.</p>
        ) : (
          <ul className="member-list">
            {members.map(user => (
              <li key={user.id} className="member-list-row">
                <span className="recent-project-name">{user.name}</span>
                <span className="app-card-due">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="page-header">
          <h2>Tasks</h2>
          <button className="btn-primary" onClick={openCreateModal}>
            + Add Task
          </button>
        </div>

        {projectTasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          <div className="card-grid">
            {projectTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </section>

      {modalMode && (
        <Modal
          title={modalMode === "edit" ? "Edit Task" : "New Task"}
          onClose={closeModal}
        >
          <TaskForm
            projectId={project.id}
            projectMembers={project.members}
            initialTask={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  )
}