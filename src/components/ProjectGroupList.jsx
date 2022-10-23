import React, { useContext } from "react";
import { ProjectGroup } from "./ProjectGroup";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProjectContext from "../context/ProjectContext";

export function ProjectGroupList() {
  const { projects } = useContext(ProjectContext);
  return (
    <section className="project-group-list">
      <ul>
        {projects?.map((project) => (
          <li key={project._id}>
            <ProjectGroup project={project}></ProjectGroup>
          </li>
        ))}
      </ul>
    </section>
  );
}
