import React, { useContext, useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import ProjectContext from "../ProjectContext";

export function TimeFilter() {
  const [filterDates, setFilterDates] = useState(null);
  const { setFilter } = useContext(ProjectContext);

  useEffect(() => {
    if (!filterDates) return;
    setFilter(filterDates);
  }, [filterDates]);

  return (
    <section className="project-time-filter">
      <DatePicker selected={filterDates} onSelect={setFilterDates} buttonText="Available FROM / TO"></DatePicker>
    </section>
  );
}
