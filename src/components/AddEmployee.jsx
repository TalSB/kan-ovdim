import React, { useState } from "react";
import { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";
import RoleContext from "../context/RoleContext";

export function AddEmployee({ setIsEmployee }) {
  const [employeeName, setEmployeeName] = useState(null);
  const [employeeRoles, setEmployeeRoles] = useState(null);
  const { addEmployee } = useContext(EmployeeContext);
  const { roles } = useContext(RoleContext);

  const onNameInput = (e) => {
    setEmployeeName(e.target.value);
  };

  const onAddEmployee = async () => {
    const newEmployee = { name: employeeName, roleIds: employeeRoles || [] };
    await addEmployee(newEmployee);
  };

  const handleRoleSelect = (ev) => {
    const roleInput = ev.target;
    const selectedRoles = employeeRoles || [];

    if (roleInput.checked) {
      selectedRoles.push(roleInput.value);
    } else {
      const idx = selectedRoles.findIndex((role) => role._id === roleInput.value);
      selectedRoles.splice(idx, 1);
    }
    setEmployeeRoles(selectedRoles);
  };

  return (
    <div id="add-employee">
      <input type="text" name="employee-name" onChange={onNameInput} />
      <div className="add-employee-roles">
        {roles.map((role) => (
          <label key={role._id}>
            <input type="checkbox" value={role._id} onClick={handleRoleSelect} />
            <span>{role.name.charAt(0).toUpperCase() + role.name.substring(1)}</span>
          </label>
        ))}
      </div>
      <button
        onClick={async () => {
          await onAddEmployee();
          setIsEmployee(false);
        }}
      >
        Add Employee
      </button>
    </div>
  );
}
