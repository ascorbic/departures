import * as React from "react";

import { wrapper } from "./station-name.module.css";

export const StationName: React.FC = function StationName({ children }) {
  return (
    <div className={wrapper}>
      <div>{children}</div>
    </div>
  );
};
