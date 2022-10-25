import React, { useContext, useState } from "react";
import { useEffect } from "react";
import EmployeeContext from "../context/EmployeeContext";
import { EmployeeRoles } from "./EmployeeRoles";

export function AvailableEmployeesGroup() {
  const [availableEmployees, setAvailableEmployees] = useState(null);
  const { employees, filter, deleteEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    let filteredEmployees;
    if (!filter) setAvailableEmployees(employees);
    else {
      if (filter.from && employees) {
        if (!filter.to) filter.to = filter.from;
        filteredEmployees = employees?.filter((employee) => !(filter.from <= employee.occupiedUntil && filter.to >= employee.occupiedFrom));
        setAvailableEmployees(filteredEmployees);
      }
    }
  }, [filter, employees]);

  const onDeleteEmployee = async (employeeId) => {
    await deleteEmployee(employeeId);
  };

  return (
    <section className="available-employees-group">
      <h3 className="header">Available Employees</h3>
      <ul>
        {availableEmployees?.map((employee) => {
          return (
            <div key={employee._id} className="employee-preview">
              <li>{employee.name}</li>
              <EmployeeRoles roleIds={employee.roleIds} />
              <button
                onClick={() => {
                  onDeleteEmployee(employee._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </ul>
    </section>
  );
}
