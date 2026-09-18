import { useProject } from "../context/ProjectContext"
import StatsCard from "./StatsCard.jsx"
import { isOverdue } from "./Dashboard.jsx"
import "../styles/Dashboard.css"
import { useAuth } from "../context/Authcontext.jsx"

export default function AdminDashboard(){
    const {projects,tasks} = useProject()
    const {currentUser} = useAuth()
    const myId = currentUser.id
    const myProjects = projects.filter(p=>p.members.includes(myId))
    const activeProjects = myProjects.filter(project => project.status === "IN_PROGRESS")

    const myTask = tasks.filter(t=>t.assignedTo === myId)
    const completedTasks = myTask.filter(t => t.status = "COMPLETED")
    const pendingTasks = myTask.filter(t => t.status !== "COMPLETED")
    const overdueTasks = myTask.filter(isOverdue)
    
    return( 
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div className="dashboard-stats">
            <StatsCard label="Total Projects" value={myProjects.length} />
            <StatsCard label="Active Projects" value={activeProjects.length} />
            <StatsCard label="Total Tasks" value={myTask.length} />
            <StatsCard label="Completed" value={completedTasks.length} />
            <StatsCard label="Pending" value={pendingTasks.length} />
            <StatsCard label="Overdue" value={overdueTasks.length} />
          </div>
        </div>
      )
}