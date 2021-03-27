import * as React from "react";
import { Helmet } from "react-helmet";
import { layout } from "./layout.module.css";
import "../style/style.css";

interface Props {
  title?: string;
}
export const Layout: React.FC<Props> = function Layout({
  title = "Station Arrival and Departure Boards",
  children,
}) {
  return (
    <div className={layout}>
      <Helmet title={title}>
        <meta
          name="description"
          content="Live station arrival and departure boards"
        />
      </Helmet>
      {children}
    </div>
  );
};
