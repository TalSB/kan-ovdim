import React, { useState } from "react";
import { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";

export function AddEmployee({ setIsEmployee }) {
  const [employeeName, setEmployeeName] = useState(null);
  const { addEmployee } = useContext(EmployeeContext);

  const onNameInput = (e) => {
    setEmployeeName(e.target.value);
  };

  const onAddEmployee = async () => {
    const newEmployee = { name: employeeName };
    await addEmployee(newEmployee);
  };

  return (
    <div id="add-employee">
      <input type="text" name="employee-name" onChange={onNameInput} />
      <select name="" id="">
        {" "}
      </select>
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
