import React, { useContext, useState } from "react";
import EmployeeContext from "../context/EmployeeContext";
import { RoleBox } from "./EmployeeRoles";

export function AvailableEmployeesGroup() {
  const [availableEmployees, setAvailableEmployees] = useState(null);
  const { employees, deleteEmployee } = useContext(EmployeeContext);

  const onDeleteEmployee = async (employeeId) => {
    await deleteEmployee(employeeId);
  };

  return (
    <section className="available-employees-group">
      <h3 className="header">Available Employees</h3>
      <ul>
        {employees?.map((employee) => {
          return (
            <div key={employee._id} className="employee-preview">
              <li>{employee.name}</li>
              <RoleBox roleIds={employee.roleIds}></RoleBox>
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
