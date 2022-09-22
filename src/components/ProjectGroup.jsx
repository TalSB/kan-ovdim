import React, { useContext, useRef, useState } from "react";
import { EmployeeGroup } from "./EmployeeGroup";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import ProjectContext from "../ProjectContext";
import EmployeeContext from "../EmployeeContext";
import { DatePicker } from "./DatePicker";

export function ProjectGroup({ project }) {
  const [dates, setDates] = useState(null);
  const [employeeDates, setEmployeeDates] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const { updateProject } = useContext(ProjectContext);
  const { employees, updateEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    const { startDate, endDate } = project;
    const dateObj = {};

    if (startDate) dateObj.from = startDate;
    if (endDate) dateObj.to = endDate;

    setDates(dateObj);
  }, []);

  const setProjectDates = async () => {
    const updatedProject = JSON.parse(JSON.stringify(project));

    if (dates?.from) updatedProject.startDate = dates.from;
    if (dates?.to) updatedProject.endDate = dates.to;

    await updateProject(updatedProject);

    const projectEmployees = employees.filter((employee) => project.employeeIds.includes(employee.id));
    projectEmployees.forEach(async (employee) => {
      const updatedEmployee = { ...employee };
      if (updatedEmployee.isOccupiedChanged) return;
      updatedEmployee.occupiedFrom = dates?.from;
      updatedEmployee.occupiedUntil = dates?.to;
      await updateEmployee(updatedEmployee);
    });
  };

  const setCustomEmployeeDates = async (employeeId) => {
    const employeeToUpdate = employees.find((employee) => employee.id === employeeId);
    const updatedEmployee = JSON.parse(JSON.stringify(employeeToUpdate));
    if (employeeDates.from) updatedEmployee.occupiedFrom = employeeDates.from;
    if (employeeDates.to) updatedEmployee.occupiedUntil = employeeDates.to;
    updatedEmployee.isOccupiedChanged = true;
    await updateEmployee(updatedEmployee);
  };

  return (
    <section className="project-group">
      <DatePicker selected={dates} onSelect={setDates} confirmHandler={setProjectDates} buttonText={"Set Project Date"}></DatePicker>

      <h3 className="project-name">{project.name}</h3>
      <ul className="project-employee-list">
        {employees.map((employee) => {
          if (project.employeeIds?.includes(employee.id))
            return (
              <div key={employee.id} className="project-employee-preview">
                <li>{employee.name}</li>
                <DatePicker
                  selected={employeeDates}
                  onSelect={setEmployeeDates}
                  confirmHandler={() => {
                    setCustomEmployeeDates(employee.id);
                  }}
                ></DatePicker>
              </div>
            );
        })}
      </ul>
      {isAddingEmployee ? (
        <EmployeeGroup setIsAddingEmployee={setIsAddingEmployee} projectId={project.id}></EmployeeGroup>
      ) : (
        <button onClick={() => setIsAddingEmployee(true)}>Add Employee</button>
      )}
    </section>
  );
}
