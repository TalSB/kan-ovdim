import React, { useContext } from "react";
import EmployeeContext from "../EmployeeContext";
import ProjectContext from "../ProjectContext";

export function EmployeePreview({ employee, projectId, setIsAddingEmployee}) {
  const {updateEmployee} = useContext(EmployeeContext);
  const { projects, updateProject} = useContext(ProjectContext)

  const onAddEmployeeToProject = async () => {
    const updatedEmployee = JSON.parse(JSON.stringify(employee));
    const project = {...projects.find(proj => proj.id === projectId)};
    project.employeeIds.push(employee.id);
    setIsAddingEmployee(false)
    await updateProject(project)
  };

  return (
    <section className="employee-preview">
      <h5 onClick={onAddEmployeeToProject}>{employee.name}</h5>
    </section>
  );
}
