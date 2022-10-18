import React, { useContext, useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import ProjectContext from "../ProjectContext";

export function ProjectTimeFilter() {
  const [filterDates, setFilterDates] = useState(null);
  const { setFilter } = useContext(ProjectContext);

  useEffect(() => {
    let dates = {};
    if (!filterDates) {
      dates.from = null;
      dates.to = null;
    } else {
      if (filterDates.from) dates.from = new Date(filterDates.from).getTime();
      if (filterDates.to) dates.to = new Date(filterDates.to).getTime();
    }
    setFilter(dates);
  }, [filterDates]);

  return (
    <section className="project-time-filter">
      <DatePicker selected={filterDates} onSelect={setFilterDates} buttonText="Show project from / to"></DatePicker>
    </section>
  );
}
