import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProject } from "../context/ProjectContext"
import { ProjectCard } from "../Components//Card"
import Modal from "../Components/Modal"
import ProjectForm from "../Components/ProjectForm"
import "../styles/form.css"

export default function AllProjects() {
  const { projects, addProject, updateProject, deleteProject } = useProject()
  const navigate = useNavigate()

  const [statusFilter, setStatusFilter] = useState("ALL")
  const [priorityFilter, setPriorityFilter] = useState("ALL")
  const [modalMode, setModalMode] = useState(null)
  const [editingProject, setEditingProject] = useState(null)

  const filteredProjects = projects
    .filter(project => {
      const matchesStatus =
        statusFilter === "ALL" || project.status === statusFilter
      const matchesPriority =
        priorityFilter === "ALL" || project.priority === priorityFilter
      return matchesStatus && matchesPriority
    }).sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))

  function openCreateModal() {
    setEditingProject(null)
    setModalMode("create")
  }

  function openEditModal(project) {
    setEditingProject(project)
    setModalMode("edit")
  }

  function closeModal() {
    setModalMode(null)
    setEditingProject(null)
  }

  function handleFormSubmit(formData) {
    if (modalMode === "edit") {
      updateProject(editingProject.id, formData)
    } else {
      addProject(formData)
    }
    closeModal()
  }

  function handleDelete(project) {
    const confirmed = window.confirm(
      `Delete "${project.name}"? This will also delete its tasks.`
    )
    if (confirmed) {
      deleteProject(project.id)
    }
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={openCreateModal}>
          + New Project
        </button>
      </div>

      <div className="filter-bar">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="PLANNING">Planning</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="empty-state">No projects match your filters.</p>
      ) : (
        <div className="card-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={p => navigate(`/admin/projects/${p.id}`)}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalMode && (
        <Modal
          title={modalMode === "edit" ? "Edit Project" : "New Project"}
          onClose={closeModal}
        >
          <ProjectForm
            initialProject={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  )
}
