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

const frames = ["-", "\\", "|", "/"];

export function useSpinner(columns: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((idx) => (idx + 1) % columns);
    }, 50);
    return () => clearInterval(timer);
  }, [setIndex, columns]);

  return `${"&nbsp;".repeat(index)}${frames[index % 4]}${"&nbsp;".repeat(
    columns - 1 - index
  )}`;
}
