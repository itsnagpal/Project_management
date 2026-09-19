import { useUserDashboardData } from "../Functions/UserDatafunction.js"
import StatsCard from "./StatsCard.jsx"

import "../styles/Dashboard.css"

export default function UserDashboard(){
    const {
    myProjects,
    myActiveProjects,
    myTasks,
    myCompletedTasks,
    myPendingTasks,
    myOverdueTasks
  } = useUserDashboardData()
    
    return( 
        <div className="dashboard">
          <h1>Dashboard</h1>
          <div className="dashboard-stats">
            <StatsCard label="Total Projects" value={myProjects.length} />
            <StatsCard label="Active Projects" value={myActiveProjects.length} />
            <StatsCard label="Total Tasks" value={myTasks.length} />
            <StatsCard label="Completed" value={myCompletedTasks.length} />
            <StatsCard label="Pending" value={myPendingTasks.length} />
            <StatsCard label="Overdue" value={myOverdueTasks.length} />
          </div>
        </div>
      )
    
}

 