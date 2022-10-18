import React, { useContext, useState } from "react";
import EmployeeContext from "../EmployeeContext";

export function AvailableEmployeesGroup() {
  const [availableEmployees, setAvailableEmployees] = useState(null);
  const { employees } = useContext(EmployeeContext);

  return (
    <section className="available-employees-group">
      <h3 className="header">Available Employees</h3>
      <ul>
        {employees?.map((employee) => {
          return <li key={employee._id}>{employee.name}</li>;
        })}
      </ul>
    </section>
  );
}
