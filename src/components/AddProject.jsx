import React, { useContext } from "react";
import { useState } from "react";
import ProjectContext from "../ProjectContext";
import { DayPicker } from "react-day-picker";

export function AddProject() {
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [isPickingDates, setIsPickingDates] = useState(false);
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
          {isPickingDates ? (
            <div className="date-picker">
              <DayPicker numberOfMonths={2} mode="range" selected={dates} onSelect={setDates} />
              <button
                onClick={() => {
                  setIsPickingDates(false);
                }}
              >
                Set Dates
              </button>
            </div>
          ) : (
            <button onClick={() => setIsPickingDates(true)}>Set Project Dates</button>
          )}
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
