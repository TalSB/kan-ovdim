import React, { useState } from "react";
import { EmployeeGroup } from "./EmployeeGroup";

export function ProjectGroup({ project, employees }) {
  return (
    <section className="project-group">
      <h3 className="project-name">{project.name}</h3>
    </section>
  );
}
