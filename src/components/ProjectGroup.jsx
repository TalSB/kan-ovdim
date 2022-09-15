import React, { useState } from "react";
import { EmployeeGroup } from "./EmployeeGroup";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export function ProjectGroup({ project, employees, updateProject }) {
  const [dates, setDates] = useState(null);
  const [isPickingDates, setIsPickingDates] = useState(false);

  useEffect(() => {
    const { startDate, endDate } = project;
    const dateObj = {};

    if (startDate) dateObj.from = startDate;
    if (endDate) dateObj.to = endDate;

    setDates(dateObj);
  }, []);

  const setProjectDates = async () => {
    setIsPickingDates(false);
    const updatedProject = JSON.parse(JSON.stringify(project));

    if (dates?.from) updatedProject.startDate = dates.from;
    if (dates?.to) updatedProject.endDate = dates.to;
    await updateProject(updatedProject);
  };

  return (
    <section className="project-group">
      <button onClick={() => setIsPickingDates(true)}>Set Time</button>
      <h3 className="project-name">{project.name}</h3>
      {isPickingDates ? (
        <div className="date-picker">
          <DayPicker numberOfMonths={2} mode="range" selected={dates} onSelect={setDates} />
          <button onClick={setProjectDates}>Choose Dates</button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
