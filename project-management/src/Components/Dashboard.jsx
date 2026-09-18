import { initialProjects, initialTasks } from "../data/projectsMockData"
import StatsCard from "./StatsCard"
import "../styles/Dashboard.css"


function isOverdue(task) {
const today = new Date()
today.setHours(0, 0, 0, 0)
return new Date(task.dueDate) < today && task.status !== "COMPLETED"
}

export default function Dashboard() {
  const projects = initialProjects
  const tasks= initialTasks
  const projectName = projects.map(u => u.name)

  const activeProjects = projects.filter(project => project.status === "IN_PROGRESS").length
  const totalProjects = projects.length
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === "COMPLETED").length
  const pendingTasks = tasks.filter(t => t.status !== "COMPLETED").length
  const overdueTasks = tasks.filter(isOverdue).length
  
  // console.log(overdueTasks)
  return( 
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <StatsCard label="Projects" value={totalProjects} />
        <StatsCard label="Active Projects" value={activeProjects} />
        <StatsCard label="Total Tasks" value={totalTasks} />
        <StatsCard label="Completed" value={completedTasks} />
        <StatsCard label="Pending" value={pendingTasks} />
        <StatsCard label="Overdue" value={overdueTasks} />
      </div>
    </div>
  )
}






























// import { useProjects } from "../../context/ProjectContext"
// import StatsCard from "../../components/StatsCard/StatsCard"
// import "../../styles/dashboard.css"

// function formatStatus(status) {
//   return status
//     .toLowerCase()
//     .split("_")
//     .map(word => word[0].toUpperCase() + word.slice(1))
//     .join(" ")
// }

// function isOverdue(task) {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//   return new Date(task.dueDate) < today && task.status !== "COMPLETED"
// }

// export default function Dashboard() {
//   const { projects, tasks } = useProjects()

//   // Everything below is calculated from live data — nothing is hardcoded
//   const totalProjects = projects.length
//   const activeProjects = projects.filter(
//     p => p.status === "IN_PROGRESS"
//   ).length

//   const totalTasks = tasks.length
//   const completedTasks = tasks.filter(t => t.status === "COMPLETED").length
//   const pendingTasks = tasks.filter(t => t.status !== "COMPLETED").length
//   const overdueTasks = tasks.filter(isOverdue).length

//   const recentProjects = [...projects]
//     .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//     .slice(0, 3)

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>

//       <div className="dashboard-stats">
//         <StatsCard label="Projects" value={totalProjects} />
//         <StatsCard label="Active Projects" value={activeProjects} />
//         <StatsCard label="Total Tasks" value={totalTasks} />
//         <StatsCard label="Completed" value={completedTasks} />
//         <StatsCard label="Pending" value={pendingTasks} />
//         <StatsCard label="Overdue" value={overdueTasks} />
//       </div>

//       <section className="dashboard-recent">
//         <h2>Recent Projects</h2>

//         {recentProjects.length === 0 ? (
//           <p className="empty-state">No projects found.</p>
//         ) : (
//           <ul className="recent-projects-list">
//             {recentProjects.map(project => (
//               <li key={project.id} className="recent-project-row">
//                 <span className="recent-project-name">{project.name}</span>
//                 <span
//                   className={`status-badge status-${project.status.toLowerCase()}`}
//                 >
//                   {formatStatus(project.status)}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   )
// }