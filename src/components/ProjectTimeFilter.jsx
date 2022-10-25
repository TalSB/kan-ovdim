import React, { useContext, useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import ProjectContext from "../context/ProjectContext";
import EmployeeContext from "../context/EmployeeContext";

export function ProjectTimeFilter() {
  const [filterDates, setFilterDates] = useState({ from: new Date(), to: null });
  const projectContext = useContext(ProjectContext);
  const employeeContext = useContext(EmployeeContext);

  useEffect(() => {
    let dates = {};
    if (!filterDates) {
      dates.from = null;
      dates.to = null;
    } else {
      if (filterDates.from) dates.from = new Date(filterDates.from).getTime();
      if (filterDates.to) dates.to = new Date(filterDates.to).getTime();
    }
    projectContext.setFilter(dates);
    employeeContext.onSetFilter(dates);
  }, [filterDates]);

  return (
    <section className="project-time-filter">
      <DatePicker selected={filterDates} onSelect={setFilterDates} buttonText="Filter Dates"></DatePicker>
      <div className="filter-dates-preview">
        <span>{filterDates?.from && `from: ${filterDates.from.getDate()}/${filterDates.from.getMonth() + 1}/${filterDates.from.getFullYear()}`}</span>
        <span>{filterDates?.to && `to: ${filterDates.to.getDate()}/${filterDates.to.getMonth() + 1}/${filterDates.to.getFullYear()}`}</span>
      </div>
    </section>
  );
}
