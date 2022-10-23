import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoleContext from "../context/RoleContext";

export function RoleBox({ roleIds }) {
  const { roles } = useContext(RoleContext);
  const [employeeRoles, setEmployeeRoles] = useState(null);

  useEffect(() => {
    const relevantRoles = roleIds?.map((roleId) => {
      return roles.find((role) => roleId === role._id);
    });
    setEmployeeRoles(relevantRoles);
  }, [roles]);

  return (
    <section className="employee-roles-container">
      <ul className="roles">
        {employeeRoles?.map((role) => (
          <li key={role?._id} className="role-box" style={{ background: role?.color }}>
            <div className="role-name">{role?.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
