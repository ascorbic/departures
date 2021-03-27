import { Link } from "gatsby";
import * as React from "react";
import { wrapper, homeLink } from "./station-name.module.css";

interface Props {
  name: string;
}
export const StationName: React.FC<Props> = function StationName({ name }) {
  return (
    <div className={wrapper}>
      <Link className={homeLink} to="/" aria-label="Home"></Link>
      <div>{name}</div>
    </div>
  );
};
