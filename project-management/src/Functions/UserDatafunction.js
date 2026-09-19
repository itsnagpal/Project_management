import { useAuth } from "../context/Authcontext";
import { useProject } from "../context/ProjectContext";
import { isOverdue } from "../admin-pages/Dashboard";

export function useUserDashboardData() {
  const { currentUser } = useAuth();
  const { projects, tasks } = useProject();
  const myId = currentUser.id;

  const myProjects = projects.filter((p) => p.members.includes(myId));
  const myActiveProjects = myProjects.filter((p) => p.status === "IN_PROGRESS");

  const myTasks = tasks.filter((t) => t.assignedTo === myId);
  const myCompletedTasks = myTasks.filter((t) => t.status === "COMPLETED");
  const myPendingTasks = myTasks.filter((t) => t.status !== "COMPLETED");
  const myOverdueTasks = myTasks.filter(isOverdue);

  return {
    myId,
    myProjects,
    myActiveProjects,
    myTasks,
    myCompletedTasks,
    myPendingTasks,
    myOverdueTasks,
  };
}
