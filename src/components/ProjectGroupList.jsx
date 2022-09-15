import React from "react";
import { ProjectGroup } from "./ProjectGroup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function ProjectGroupList({ projects, employees, updateProject }) {
  return (
    <section className="project-group-list">
      <Droppable type="a" direction="horizontal" droppableId={"groups-container"}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {projects?.map((project, idx) => (
              <Draggable innerRef={provided.innerRef} key={project.id} index={idx} draggableId={`${project.id}`}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <ProjectGroup updateProject={updateProject} employees={employees} project={project}></ProjectGroup>
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </section>
  );
}
