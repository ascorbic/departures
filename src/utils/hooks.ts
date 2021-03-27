import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
export function useCurrentTimeString() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return time;
}
