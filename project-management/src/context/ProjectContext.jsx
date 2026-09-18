import { createContext, useContext, useState, useEffect } from "react"
import { initialProjects, initialTasks } from "../data/projectsMockData"

const ProjectContext = createContext(null)

export function ProjectProvider({children}){
  
  const [projects, setProjects] = useState(() =>{
    const saved = localStorage.getItem("projects")
    return (saved && saved!== null) ? JSON.parse(saved):initialProjects
})
  const [tasks, setTasks] = useState(() =>{
      const savedTasks = localStorage.getItem("tasks")
      return (savedTasks && savedTasks!== null)? JSON.parse(savedTasks): initialTasks
  }
  )

  
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])
  
  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  
  function addProject(project) {
    const newProject = { ...project, id: Date.now() }
    setProjects(prev => [...prev, newProject])
  }
  function updateProject(id,update){
    setProjects(prev => prev.map(p => p.id === id ? [...p, ...update]:p))
  }
  function deleteProject(id){
    setProjects(prev => prev.filter(p => p.id !== id ))
    setTasks( prev => prev.filter( t => t.prodectID !== id))
  }


  function addtask(task){
    const newTask = {...task, id:Date.now() }
    setTasks(prev => [...prev, newTask])
  }
  function updateTask(id,update){
    setTasks( prev => prev.map(t => t.id === id? [...t,...update]:t))
  }
  function deleteTask(id){
    setTask (prev => prev.filter( t=>t.id !==id))
  }
  
  const value = {
    projects,
    tasks,
    addProject,
    updateProject,
    deleteProject,
    addtask,
    deleteTask,
    updateTask
  }
  return(
    <ProjectContext.Provider value={value}>
    {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within an ProjectProvider")
  }
  return context
}

