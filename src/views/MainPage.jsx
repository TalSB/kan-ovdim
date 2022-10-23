import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
// import { EmployeeGroup } from "../components/EmployeeGroup";
import { ProjectGroupList } from "../components/ProjectGroupList";
import { AddProject } from "../components/AddProject";
import { AvailableEmployeesGroup } from "../components/AvailableEmployeesGroup";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ProjectTimeFilter } from "../components/ProjectTimeFilter";
import { AvailableEmployeeTimeFilter } from "../components/AvailableEmployeeTimeFilter";
import { AddEntityModal } from "../components/AddEntityModal";
import { FilterModal } from "../components/FilterModal";

export function MainPage() {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
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
      <div id="add-entity-btns">
        <button onClick={() => setIsAddingProject(true)}>Add Project</button>
        <button
          onClick={() => {
            setIsAddingEmployee(true);
          }}
        >
          Add Employee
        </button>
      </div>

      <div className="project-groups-container">
        <ProjectGroupList></ProjectGroupList>
      </div>
      <div className="available-employees-container">
        <AvailableEmployeesGroup></AvailableEmployeesGroup>
      </div>

      <div className={`modal-background ${isAddingEmployee || isAddingProject || isFilter ? "open" : "closed"}`}></div>
      <AddEntityModal
        isEmployee={isAddingEmployee}
        setIsEmployee={setIsAddingEmployee}
        setIsProject={setIsAddingProject}
        isProject={isAddingProject}
      ></AddEntityModal>
      <button
        id="filter-button"
        onClick={() => {
          setIsFilter(true);
        }}
      >
        Filter Dates
      </button>
      <FilterModal setIsFilter={setIsFilter} isFilter={isFilter}></FilterModal>
    </section>
  );
}
