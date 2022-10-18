import React, { useContext, useRef } from "react";
import { useState } from "react";
import ProjectContext from "../ProjectContext";
import { DatePicker } from "./DatePicker";

export function AddProject() {
  const [isAddGroup, setIsAddGroup] = useState(false);
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
    console.log(newProject);
    setIsAddGroup(false);
    await addProject(newProject);
  };

  return (
    <div className="add-project-group">
      {isAddGroup ? (
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
      ) : (
        <button
          onClick={() => {
            setIsAddGroup(true);
          }}
        >
          Add Project
        </button>
      )}
    </div>
  );
}
