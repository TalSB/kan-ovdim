import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DatePicker } from "./DatePicker";
import EmployeeContext from "../EmployeeContext";

export function AvailableEmployeeTimeFilter() {
  const [filterDates, setFilterDates] = useState(null);
  const { setFilter } = useContext(EmployeeContext);

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
      <DatePicker selected={filterDates} onSelect={setFilterDates} buttonText="Show Available Employees from / to"></DatePicker>
    </section>
  );
}
