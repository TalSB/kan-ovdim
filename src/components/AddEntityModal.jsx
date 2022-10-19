import React, { useRef } from "react";
import { AddProject } from "./AddProject";
import { AddEmployee } from "./AddEmployee";
import { useClickOutside } from "../hooks/useClickOutside";

export function AddEntityModal({ isProject, setIsProject, isEmployee, setIsEmployee }) {
  const modalRef = useRef();
  useClickOutside(modalRef, () => {
    setIsProject(false);
    setIsEmployee(false);
  });
  return (
    <section ref={modalRef} id="entity-modal" className={isProject || isEmployee ? "active" : ""}>
      {isProject && <AddProject setIsProject={setIsProject}></AddProject>}
      {isEmployee && <AddEmployee setIsEmployee={setIsEmployee}></AddEmployee>}
    </section>
  );
}
