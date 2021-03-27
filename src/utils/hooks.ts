import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
export function useCurrentTime() {
  const [timeString, setTimeString] = useState("");
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTimeString(formatter.format(date));
      setMinutes(date.getMinutes());
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return { timeString, minutes };
}
