import React from "react";
import { useState } from "react";

export function AddProject({ addProject }) {
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [projectName, setProjectName] = useState(null);

  const onAddGroup = () => {
    addProject(projectName);
    setIsAddGroup(false);
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
          <button onClick={onAddGroup}>Add</button>
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
