import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { EmployeeGroup } from "../components/EmployeeGroup";
import { ProjectGroupList } from "../components/ProjectGroupList";
import { AddProject } from "../components/AddProject";
import { AvailableEmployeesGroup } from "../components/AvailableEmployeesGroup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ProjectTimeFilter } from "../components/ProjectTimeFilter";
import { AvailableEmployeeTimeFilter } from "../components/AvailableEmployeeTimeFilter";

export function MainPage() {
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
      <AddProject></AddProject>

      <div className="project-groups-container">
        <ProjectGroupList></ProjectGroupList>
      </div>
      <div className="available-employees-container">
        <AvailableEmployeesGroup></AvailableEmployeesGroup>
      </div>
      <div className="filter-container">
        <ProjectTimeFilter></ProjectTimeFilter>
        <AvailableEmployeeTimeFilter></AvailableEmployeeTimeFilter>
      </div>
    </section>
  );
}
