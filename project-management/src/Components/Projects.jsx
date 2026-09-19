import { useState } from "react";
import { useUserDashboardData } from "../Functions/UserDatafunction";
import { ProjectCard } from "./Card";

export default function Projects(){
  const { myProjects } = useUserDashboardData()
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [priorityFilter, setPriorityFilter] = useState("ALL")

  const filteredProjects = myProjects.filter(project => {
    const matchesStatus =
      statusFilter === "ALL" || project.status === statusFilter
    const matchesPriority =
      priorityFilter === "ALL" || project.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

   return (
    <div className="projects-page">
      <h1>My Projects</h1>

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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}