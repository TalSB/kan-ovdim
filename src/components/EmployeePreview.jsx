import React from "react";

export function EmployeePreview({ employee }) {
  return (
    <section className="employee-preview">
      <h5>{employee.name}</h5>
    </section>
  );
}
