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
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    queryProjects();
    queryEmployees();
  }, []);

  useEffect(() => {});

  const queryEmployees = async () => {
    const currEmployees = await employeeService.getEmployees();
    setEmployees([...currEmployees]);
  };

  const queryProjects = async () => {
    const currProjects = await projectService.getProjects();
    setProjects([...currProjects]);
    console.log(projects);
  };

  const addProject = async (name) => {
    await projectService.addProject(name);
    await queryProjects();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const toIdx = result.destination.index;
    const fromIdx = result.source.index;
    const movedProject = { ...projects[fromIdx] };
    const newProjects = [...projects];
    const oldProjects = [...projects];
    newProjects.splice(fromIdx, 1);
    newProjects.splice(toIdx, 0, movedProject);
    setProjects([...newProjects]);
    try {
      await projectService.moveProject(fromIdx, toIdx);
    } catch (err) {
      console.error(err);
      setProjects([...oldProjects]);
    }
  };

  return (
    <section className="main-page">
      <AddProject addProject={addProject}></AddProject>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="project-groups-container">
          <ProjectGroupList employees={employees} projects={projects}></ProjectGroupList>
        </div>
        <EmployeeGroup employees={employees}></EmployeeGroup>
      </DragDropContext>
    </section>
  );
}
