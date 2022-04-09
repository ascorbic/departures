import * as React from "react";
import { useSpinner } from "../utils/hooks";

interface SpinnerProps {
  error?: string;
}

export const Spinner: React.FC<SpinnerProps> = function Spinner({ error }) {
  if (error) {
    return <div>{error}</div>;
  }
  const spin = useSpinner(60);
  return (
    <div style={{ width: 150 }} dangerouslySetInnerHTML={{ __html: spin }} />
  );
};
