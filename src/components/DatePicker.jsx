import React, { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useClickOutside } from "../hooks/useClickOutside";

export function DatePicker({ selected, onSelect, confirmHandler, buttonText }) {
  const [isPickingDates, setIsPickingDates] = useState(false);
  const datePickerRef = useRef();
  useClickOutside(datePickerRef, () => setIsPickingDates(false));

  return (
    <section className="date-picker-container">
      <button onClick={() => setIsPickingDates(true)}>{buttonText || "Set Dates"}</button>
      {isPickingDates && (
        <div ref={datePickerRef} className="date-picker">
          <DayPicker selected={selected} onSelect={onSelect} numberOfMonths={2} mode="range"></DayPicker>
          <button
            onClick={() => {
              setIsPickingDates(false);
              if (confirmHandler) confirmHandler();
            }}
          >
            Save Dates
          </button>
        </div>
      )}
    </section>
  );
}
