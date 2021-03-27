import * as React from "react";
import { useSpinner } from "../utils/hooks";

export const Spinner: React.FC = function Spinner() {
  const spin = useSpinner(60);
  return <span dangerouslySetInnerHTML={{ __html: spin }} />;
};
