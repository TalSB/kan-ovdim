import React, { useContext, useRef, useState } from "react";
import { EmployeeGroup } from "./EmployeeGroup";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import ProjectContext from "../ProjectContext";
import EmployeeContext from "../EmployeeContext";
import { useClickOutside } from "../hooks/useClickOutside";

export function ProjectGroup({ project }) {
  const [dates, setDates] = useState(null);
  const [employeeDates, setEmployeeDates] = useState(null);
  const [isProjectDates, setIsProjectDates] = useState(false);
  const [isEmployeeDates, setIsEmployeeDates] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const { updateProject } = useContext(ProjectContext);
  const { employees, updateEmployee } = useContext(EmployeeContext);
  const employeeDatesRef = useRef();
  const projectDatesRef = useRef();

  useClickOutside(employeeDatesRef, () => setIsEmployeeDates(false));
  useClickOutside(projectDatesRef, () => setIsProjectDates(false));

  useEffect(() => {
    const { startDate, endDate } = project;
    const dateObj = {};

    if (startDate) dateObj.from = startDate;
    if (endDate) dateObj.to = endDate;

    setDates(dateObj);
  }, []);

  const setProjectDates = async () => {
    setIsProjectDates(false);
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
    setIsEmployeeDates(false);
    const employeeToUpdate = employees.find((employee) => employee.id === employeeId);
    const updatedEmployee = JSON.parse(JSON.stringify(employeeToUpdate));
    if (employeeDates.from) updatedEmployee.occupiedFrom = employeeDates.from;
    if (employeeDates.to) updatedEmployee.occupiedUntil = employeeDates.to;
    updatedEmployee.isOccupiedChanged = true;
    await updateEmployee(updatedEmployee);
  };

  return (
    <section className="project-group">
      <button onClick={() => setIsProjectDates(true)}>Set Time</button>
      <h3 className="project-name">{project.name}</h3>
      <ul className="project-employee-list">
        {employees.map((employee) => {
          if (project.employeeIds?.includes(employee.id))
            return (
              <div key={employee.id} className="project-employee-preview">
                <li>{employee.name}</li>
                <button
                  onClick={() => {
                    setIsEmployeeDates(true);
                  }}
                >
                  set custom time
                </button>
                {isEmployeeDates ? (
                  <div ref={employeeDatesRef} className="date-picker">
                    <DayPicker numberOfMonths={2} mode="range" selected={employeeDates} onSelect={setEmployeeDates} />
                    <button
                      onClick={() => {
                        setCustomEmployeeDates(employee.id);
                      }}
                    >
                      Choose Dates
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
        })}
      </ul>
      {isProjectDates ? (
        <div ref={projectDatesRef} className="date-picker">
          <DayPicker numberOfMonths={2} mode="range" selected={dates} onSelect={setDates} />
          <button onClick={setProjectDates}>Choose Dates</button>
        </div>
      ) : (
        ""
      )}

      {isAddingEmployee ? (
        <EmployeeGroup setIsAddingEmployee={setIsAddingEmployee} projectId={project.id}></EmployeeGroup>
      ) : (
        <button onClick={() => setIsAddingEmployee(true)}>Add Employee</button>
      )}
    </section>
  );
}
