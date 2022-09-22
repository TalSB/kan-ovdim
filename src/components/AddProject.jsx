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
    const newProject = {
      name: projectName,
      startDate: dates?.from,
      endDate: dates?.to,
      employeeIds: [],
    };
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
