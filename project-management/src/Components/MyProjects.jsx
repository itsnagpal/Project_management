import { useUserDashboardData } from "../Functions/UserDatafunction";
// import { myDetails } from "./UserDashboard";
export default function MyProjects(){
    const {
    myProjects,
    myActiveProjects,
    myTasks,
    myCompletedTasks,
    myPendingTasks,
    myOverdueTasks
  } = useUserDashboardData()

  console.log( myProjects)

  

}