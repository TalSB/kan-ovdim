import React, { useContext } from "react";
import EmployeeContext from "../EmployeeContext";

export function AvailableEmployeesGroup() {
  const { employees } = useContext(EmployeeContext);

  return (
    <section className="available-employees-group">
      <h3 className="header">Available Employees</h3>
      <ul>
        {employees?.map((employee) => {
          if (!employee.occupiedFrom) return <li key={employee._id}>{employee.name}</li>;
        })}
      </ul>
    </section>
  );
}
