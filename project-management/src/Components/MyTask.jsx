import { useState } from "react"
import { useUserDashboardData } from "../Functions/UserDatafunction"
import { useProject } from "../context/ProjectContext"
import { TaskCard } from "./Card"

export default function MyTasks() {
  const { myTasks, myProjects } = useUserDashboardData()
  const { updateTask } = useProject()

  const [statusFilter, setStatusFilter] = useState("ALL")
  const [dueSort, setDueSort] = useState("SOONEST")
  const [projectFilter, setProjectFilter] = useState("ALL")

  const filteredTasks = myTasks
    .filter(task => statusFilter === "ALL" || task.status === statusFilter)
    .filter(
      task =>
        projectFilter === "ALL" || task.projectId === Number(projectFilter)
    )
    .sort((a, b) => {
      const diff = new Date(a.dueDate) - new Date(b.dueDate)
      return dueSort === "SOONEST" ? diff : -diff
    })

  function handleToggleComplete(task) {
    updateTask(task.id, {
      status: task.status === "COMPLETED" ? "TODO" : "COMPLETED"
    })
  }

  return (
    <div className="tasks-page">
      <h1>My Tasks</h1>

      <div className="filter-bar">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select value={dueSort} onChange={e => setDueSort(e.target.value)}>
          <option value="SOONEST">Due Date: Soonest</option>
          <option value="LATEST">Due Date: Latest</option>
        </select>

        <select
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
        >
          <option value="ALL">All Projects</option>
          {myProjects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-state">No tasks match your filters.</p>
      ) : (
        <div className="card-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  )
}