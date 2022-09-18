import React, { useContext, useEffect, useState } from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { employeeService } from "../services/employee-service";
import EmployeeContext from "../EmployeeContext";

export function EmployeeGroup() {
  const {employees} = useContext(EmployeeContext);
  

  const onAddEmployeeToProject = async (employeeId) => {};

  return (
    <div className="employee-group">
      <h3>Employees</h3>
      {employees?.map((employee) => (
        <EmployeePreview key={employee.id} employee={employee}></EmployeePreview>
      ))}
    </div>
  );
}
