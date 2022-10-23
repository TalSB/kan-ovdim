import React, { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";
import ProjectContext from "../context/ProjectContext";

export function EmployeePreview({ employee, projectId, setIsAddingEmployee }) {
  const { updateEmployee } = useContext(EmployeeContext);
  const { projects, updateProject } = useContext(ProjectContext);

  const onAddEmployeeToProject = async () => {
    const project = { ...projects.find((proj) => proj._id === projectId) };
    if (!project.employeeIds.includes(employee._id)) project.employeeIds.push(employee._id);
    setIsAddingEmployee(false);
    await updateProject(project);

    const updatedEmployee = { ...employee };
    // if (updatedEmployee.isOccupiedChanged) return;
    updatedEmployee.occupiedFrom = project.startDate;
    updatedEmployee.occupiedUntil = project.endDate;
    updatedEmployee.isOccupiedChanged = false;
    await updateEmployee(updatedEmployee);
  };

  return (
    <section className="employee-preview">
      <h5 onClick={onAddEmployeeToProject}>{employee.name}</h5>
    </section>
  );
}
