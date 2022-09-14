import React from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";

export function EmployeeGroup({ employees }) {
  return (
    <Droppable type="b" droppableId={"employees-container"}>
      {(provided) => (
        <div className="employee-group" {...provided.droppableProps} ref={provided.innerRef}>
          <h3>Employees</h3>
          {employees?.map((employee, idx) => (
            <Draggable innerRef={provided.innerRef} key={employee.id} index={idx} draggableId={`${employee.id}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                  <EmployeePreview employee={employee}></EmployeePreview>
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
}
