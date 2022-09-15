import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProjectGroup } from "../components/ProjectGroup";
import { EmployeeGroup } from "../components/EmployeeGroup";
import { ProjectGroupList } from "../components/ProjectGroupList";
import { projectService } from "../services/project-service";
import { AddProject } from "../components/AddProject";
import { employeeService } from "../services/employee-service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function MainPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    queryProjects();
  }, []);

  const queryProjects = async () => {
    const currProjects = await projectService.getProjects();
    setProjects([...currProjects]);
  };

  const addProject = async (name) => {
    await projectService.addProject(name);
    await queryProjects();
  };

  const updateProject = async (updatedProejct) => {
    await projectService.updateProject(updatedProejct);
    await queryProjects();
  };

  const updateEmployee = async (updatedEmployee) => {
    await employeeService.updateEmployee(updatedEmployee);
    await queryProjects();
  };

  // const onDragEnd = async (result) => {
  //   if (!result.destination) return;
  //   const toIdx = result.destination.index;
  //   const fromIdx = result.source.index;
  //   const movedProject = { ...projects[fromIdx] };
  //   const newProjects = [...projects];
  //   const oldProjects = [...projects];
  //   newProjects.splice(fromIdx, 1);
  //   newProjects.splice(toIdx, 0, movedProject);
  //   setProjects([...newProjects]);
  //   try {
  //     await projectService.moveProject(fromIdx, toIdx);
  //   } catch (err) {
  //     console.error(err);
  //     setProjects([...oldProjects]);
  //   }
  // };

  return (
    <section className="main-page">
      <AddProject addProject={addProject}></AddProject>
      <div className="project-groups-container">
        <ProjectGroupList updateEmployee={updateEmployee} updateProject={updateProject} projects={projects}></ProjectGroupList>
      </div>
      <EmployeeGroup></EmployeeGroup>
    </section>
  );
}
