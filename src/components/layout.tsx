import * as React from "react";
import { Helmet } from "react-helmet";
import { layout, visuallyHidden } from "./layout.module.css";
import "../style/style.css";
import ogimage from "../images/departure.webp";
interface Props {
  title?: string;
}
export const Layout: React.FC<Props> = function Layout({
  title = "Station Arrival and Departure Boards",
  children,
}) {
  return (
    <div className={layout}>
      <Helmet title={title} htmlAttributes={{ lang: "en" }}>
        <meta
          name="description"
          content="Live station arrival and departure boards"
        />
        <meta
          name="og:description"
          content="Live station arrival and departure boards"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={ogimage} />
        <meta property="twitter:image" content={ogimage} />
        <meta property="twitter:creator" content="@ascorbic" />
      </Helmet>
      <h1 className={visuallyHidden}>{title}</h1>
      {children}
    </div>
  );
};
