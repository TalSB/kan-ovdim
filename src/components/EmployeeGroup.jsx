import React, { useContext, useEffect, useState, useRef } from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { employeeService } from "../services/employee-service";
import EmployeeContext from "../EmployeeContext";
import { useClickOutside } from "../hooks/useClickOutside";

export function EmployeeGroup({ projectId, setIsAddingEmployee }) {
  const { employees } = useContext(EmployeeContext);
  const groupContainer = useRef();

  useClickOutside(groupContainer, () => setIsAddingEmployee(false));

  return (
    <div ref={groupContainer} className="employee-group">
      <h3>Employees</h3>
      {employees?.map((employee) => (
        <EmployeePreview setIsAddingEmployee={setIsAddingEmployee} key={employee.id} employee={employee} projectId={projectId}></EmployeePreview>
      ))}
    </div>
  );
}
