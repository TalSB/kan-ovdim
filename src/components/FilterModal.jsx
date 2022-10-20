import React, { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { ProjectTimeFilter } from "./ProjectTimeFilter";
import { AvailableEmployeeTimeFilter } from "./AvailableEmployeeTimeFilter";

export function FilterModal({ setIsFilter, isFilter }) {
  const modalRef = useRef();
  useClickOutside(modalRef, () => {
    setIsFilter(false);
  });

  console.log(isFilter);
  return (
    <div ref={modalRef} className={`filter-modal ${isFilter ? "open" : ""}`}>
      <div className="filter-container">
        <ProjectTimeFilter></ProjectTimeFilter>
        <AvailableEmployeeTimeFilter></AvailableEmployeeTimeFilter>
      </div>
    </div>
  );
}
