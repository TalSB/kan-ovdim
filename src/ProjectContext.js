import { useState, createContext, useEffect } from 'react'
import { projectService } from './services/project-service'

const ProjectContext = createContext()

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    queryProjects()
  }, [])

  const queryProjects = async () => {
    const currProjects = await projectService.getProjects()
    setProjects([...currProjects])
  }

  const addProject = async (name) => {
    await projectService.addProject(name)
    await queryProjects()
  }

  const updateProject = async (updatedProject) => {
    await projectService.updateProject(updatedProject)
    await queryProjects()
  }

  return (
    <ProjectContext.Provider value={{addProject, queryProjects, updateProject, projects}}>{children}</ProjectContext.Provider>
  )
}

export default ProjectContext
