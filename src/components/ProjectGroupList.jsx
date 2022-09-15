import React from "react";
import { ProjectGroup } from "./ProjectGroup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function ProjectGroupList({ projects, updateProject, updateEmployee }) {
  return (
    <section className="project-group-list">
      <ul>
        {projects?.map((project, idx) => (
          <li>
            <ProjectGroup updateEmployee={updateEmployee} updateProject={updateProject} project={project}></ProjectGroup>
          </li>
        ))}
      </ul>
    </section>
  );
}
