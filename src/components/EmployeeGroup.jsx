import React, { useContext, useEffect, useState } from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { employeeService } from "../services/employee-service";
import EmployeeContext from "../EmployeeContext";

export function EmployeeGroup({ projectId, setIsAddingEmployee }) {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="employee-group">
      <h3>Employees</h3>
      {employees?.map((employee) => (
        <EmployeePreview setIsAddingEmployee={setIsAddingEmployee} key={employee.id} employee={employee} projectId={projectId}></EmployeePreview>
      ))}
    </div>
  );
}
