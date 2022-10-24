import React, { useContext, useRef, useState } from "react";
import { EmployeeGroup } from "./EmployeeGroup";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import ProjectContext from "../context/ProjectContext";
import EmployeeContext from "../context/EmployeeContext";
import { DatePicker } from "./DatePicker";
import { EmployeeRoles } from "./EmployeeRoles";

export function ProjectGroup({ project }) {
  const [dates, setDates] = useState(null);
  const [employeeDates, setEmployeeDates] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const { updateProject, deleteProject } = useContext(ProjectContext);
  const { employees, updateEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    const { startDate, endDate } = project;
    const dateObj = {};

    if (startDate) dateObj.from = new Date(startDate);
    if (endDate) dateObj.to = new Date(endDate);

    setDates(dateObj);
  }, [project]);

  useEffect(() => {
    const datesByEmployees = project?.employeeIds?.map((employeeId) => {
      const employee = employees?.find((emp) => emp._id === employeeId);
      return {
        employeeId,
        from: employee?.occupiedFrom && new Date(employee.occupiedFrom),
        to: employee?.occupiedUntil && new Date(employee.occupiedUntil),
      };
    });
    setEmployeeDates(datesByEmployees);
  }, [employees]);

  const setProjectDates = async () => {
    const updatedProject = JSON.parse(JSON.stringify(project));

    if (dates?.from) updatedProject.startDate = new Date(dates.from).getTime();
    if (dates?.to) updatedProject.endDate = new Date(dates.to).getTime();
    else updatedProject.endDate = updatedProject.startDate;

    await updateProject(updatedProject);

    const projectEmployees = employees.filter((employee) => project.employeeIds.includes(employee._id));
    projectEmployees.forEach(async (employee) => {
      const updatedEmployee = { ...employee };
      if (updatedEmployee.isOccupiedChanged) return;
      updatedEmployee.occupiedFrom = dates?.from;
      updatedEmployee.occupiedUntil = dates?.to;
      await updateEmployee(updatedEmployee);
    });
  };

  const updateEmployeeDates = (employeeId, selectedDates) => {
    const idx = employeeDates.findIndex((empDate) => empDate.employeeId === employeeId);
    const newDates = { ...employeeDates[idx], ...selectedDates };
    const updatedEmployeeDates = [...employeeDates];
    updatedEmployeeDates.splice(idx, 1, newDates);
    setEmployeeDates(updatedEmployeeDates);
  };

  const setCustomEmployeeDates = async (employeeId) => {
    const employeeToUpdate = employees.find((employee) => employee._id === employeeId);
    const updatedEmployee = JSON.parse(JSON.stringify(employeeToUpdate));
    const employeeDate = employeeDates?.find((empDate) => empDate.employeeId === employeeId);
    if (employeeDate?.from) updatedEmployee.occupiedFrom = new Date(employeeDate.from).getTime();
    if (employeeDate?.to) updatedEmployee.occupiedUntil = new Date(employeeDate.to).getTime();
    else updatedEmployee.occupiedUntil = updatedEmployee.occupiedFrom;
    updatedEmployee.isOccupiedChanged = true;
    await updateEmployee(updatedEmployee);
  };

  const onDeleteProject = async () => {
    await deleteProject(project._id);
  };

  const removeEmployeeFromProject = async (employeeId) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    const idx = updatedProject.employeeIds.findIndex((empId) => empId === employeeId);
    updatedProject.employeeIds.splice(idx, 1);
    await updateProject(updatedProject);

    let removedEmployee = employees.find((employee) => employee._id === employeeId);
    if (!removedEmployee || removedEmployee?.isOccupiedChanged) return;
    removedEmployee = JSON.parse(JSON.stringify(removedEmployee));
    removedEmployee.occupiedFrom = null;
    removedEmployee.occupiedUntil = null;
    await updateEmployee(removedEmployee);
  };

  return (
    <section className="project-group">
      <button onClick={onDeleteProject}>X</button>
      <DatePicker selected={dates} onSelect={setDates} confirmHandler={setProjectDates} buttonText={"Set Project Date"}></DatePicker>
      <h3 className="project-name">{project.name}</h3>
      <ul className="project-employee-list">
        {employees?.map((employee) => {
          if (project.employeeIds?.includes(employee._id)) {
            const employeeDate = employeeDates?.find((emp) => emp.employeeId === employee._id);
            const selectedEmployeeDates = { from: employeeDate?.from, to: employeeDate?.to };
            return (
              <div key={employee._id} className="project-employee-preview">
                <li>{employee.name}</li>
                <EmployeeRoles roleIds={employee?.roleIds} />
                <DatePicker
                  selected={selectedEmployeeDates}
                  onSelect={(selectedDates) => {
                    updateEmployeeDates(employee._id, selectedDates);
                  }}
                  confirmHandler={() => {
                    setCustomEmployeeDates(employee._id);
                  }}
                ></DatePicker>
                <button
                  onClick={() => {
                    removeEmployeeFromProject(employee._id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          }
        })}
      </ul>
      {isAddingEmployee ? (
        <EmployeeGroup setIsAddingEmployee={setIsAddingEmployee} projectId={project._id}></EmployeeGroup>
      ) : (
        <button onClick={() => setIsAddingEmployee(true)}>Add Employee</button>
      )}
    </section>
  );
}
