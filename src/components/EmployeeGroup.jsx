import React, { useContext, useEffect, useState, useRef } from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { employeeService } from "../services/employee-service";
import EmployeeContext from "../context/EmployeeContext";
import ProjectContext from "../context/ProjectContext";
import { useClickOutside } from "../hooks/useClickOutside";

export function EmployeeGroup({ projectId, setIsAddingEmployee }) {
  const [freeEmployees, setFreeEmployees] = useState(null);
  const { employees } = useContext(EmployeeContext);
  const { projects } = useContext(ProjectContext);
  const groupContainer = useRef();

  useEffect(() => {
    let filteredEmployees = employees?.filter((employee) => {
      const project = projects.find((proj) => proj._id === projectId);
      return (
        !project?.employeeIds.includes(employee._id) && !(employee.occupiedFrom <= project.endDate && employee.occupiedUntil >= project.startDate)
      );
    });
    if (filteredEmployees && filteredEmployees.length) setFreeEmployees(filteredEmployees);
  }, [employees]);

  useClickOutside(groupContainer, () => setIsAddingEmployee(false));

  return (
    <div ref={groupContainer} className="employee-group">
      <h3>Employees</h3>
      {freeEmployees?.map((employee) => (
        <EmployeePreview setIsAddingEmployee={setIsAddingEmployee} key={employee._id} employee={employee} projectId={projectId}></EmployeePreview>
      ))}
    </div>
  );
}
