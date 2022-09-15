import React, { useEffect, useState } from "react";
import { EmployeePreview } from "./EmployeePreview";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { employeeService } from "../services/employee-service";

export function EmployeeGroup({ updateEmployee, projectId }) {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    queryEmployees();
  }, []);

  const queryEmployees = async () => {
    const currEmployees = await employeeService.getEmployees();
    setEmployees([...currEmployees]);
  };

  const onAddEmployeeToProject = async (employeeId) => {};

  return (
    <div className="employee-group">
      <h3>Employees</h3>
      {employees?.map((employee) => (
        <EmployeePreview projectId={projectId} updateEmployee={updateEmployee} employee={employee}></EmployeePreview>
      ))}
    </div>
  );
}
