// import { initialProjects, initialTasks } from "../data/projectsMockData"
import { useProject } from "../context/ProjectContext"
import StatsCard from "./StatsCard.jsx"
import "../styles/Dashboard.css"


export function isOverdue(task) {
const today = new Date()
today.setHours(0, 0, 0, 0)
return new Date(task.dueDate) < today && task.status !== "COMPLETED"
}

export default function Dashboard() {
  
  const {projects,tasks} = useProject()

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
        <StatsCard label="Total Projects" value={totalProjects} />
        <StatsCard label="Active Projects" value={activeProjects} />
        <StatsCard label="Total Tasks" value={totalTasks} />
        <StatsCard label="Completed" value={completedTasks} />
        <StatsCard label="Pending" value={pendingTasks} />
        <StatsCard label="Overdue" value={overdueTasks} />
      </div>
    </div>
  )
}





























