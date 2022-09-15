import { useEffect, useState } from "react";

export function useClickOutside(ref) {
  const [isClickOutside, seIsClickOutside] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        seIsClickOutside(true);
      } else {
        seIsClickOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClickOutside;
}
