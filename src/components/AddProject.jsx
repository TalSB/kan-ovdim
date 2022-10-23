import React, { useContext } from "react";
import { useState } from "react";
import ProjectContext from "../context/ProjectContext";
import { DatePicker } from "./DatePicker";

export function AddProject({ setIsProject }) {
  const [projectName, setProjectName] = useState(null);
  const [dates, setDates] = useState(null);

  const { addProject } = useContext(ProjectContext);

  const onAddProject = async () => {
    const startDate = dates?.from ? new Date(dates.from).getTime() : null;
    const endDate = dates?.to ? new Date(dates.to).getTime() : null;
    const newProject = {
      name: projectName,
      startDate,
      endDate,
      employeeIds: [],
    };
    setIsProject(false);
    await addProject(newProject);
  };

  return (
    <div className="add-project-group">
      <div className="add-group-input-container">
        <input
          type="text"
          className="add-group-input"
          onChange={(event) => {
            const text = event.target.value;
            setProjectName(text);
          }}
        />
        <DatePicker selected={dates} onSelect={setDates} buttonText={"Set Project Date"}></DatePicker>
        <button onClick={onAddProject}>Add</button>
      </div>
    </div>
  );
}
