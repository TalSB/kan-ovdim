import React from "react";

export function EmployeePreview({ employee, updateEmployee, projectId }) {
  const onAddEmployeeToProject = async () => {
    const updatedEmployee = JSON.parse(JSON.stringify(employee));
    updatedEmployee.currentProjectId = projectId;
    await updateEmployee(updatedEmployee);
  };

  return (
    <section className="employee-preview">
      <h5 onClick={onAddEmployeeToProject}>{employee.name}</h5>
    </section>
  );
}
