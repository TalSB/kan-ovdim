import React, { useContext } from "react";
import EmployeeContext from "../EmployeeContext";

export function EmployeePreview({ employee }) {
  const {updateEmployee} = useContext(EmployeeContext);


  const onAddEmployeeToProject = async () => {
    // const updatedEmployee = JSON.parse(JSON.stringify(employee));
    // updatedEmployee.currentProjectId = projectId;
    // await updateEmployee(updatedEmployee);
  };

  return (
    <section className="employee-preview">
      <h5 onClick={onAddEmployeeToProject}>{employee.name}</h5>
    </section>
  );
}
