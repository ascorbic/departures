import * as React from "react";
import { Helmet } from "react-helmet";
import { layout, visuallyHidden, footer } from "./layout.module.css";
import "../style/style.css";
import ogimage from "../images/departure.webp";
import { graphql, useStaticQuery } from "gatsby";
interface Props {
  title?: string;
  crs?: string;
}
export const Layout: React.FC<Props> = function Layout({
  title = "Station Arrival and Departure Boards",
  children,
  crs,
}) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const url = site?.siteMetadata?.siteUrl;
  return (
    <div className={layout}>
      <Helmet title={title} htmlAttributes={{ lang: "en" }}>
        <link
          rel="preload"
          href={`/board/${crs || "WSB"}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <meta property="twitter:title" content={title} />
        <meta property="og:title" content={title} />
        <meta
          name="description"
          content="Live station arrival and departure boards"
        />
        <meta
          name="og:description"
          content="Live station arrival and departure boards"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={`${url}${ogimage}`} />
        <meta property="twitter:image" content={`${url}${ogimage}`} />
        <meta property="twitter:creator" content="@ascorbic" />
      </Helmet>
      <h1 className={visuallyHidden}>{title}</h1>
      {children}
      <footer className={footer}>
        Made with = by <a href="https://mk.gg">Matt Kane</a>. Powered by
        National Rail Enquiries
      </footer>
    </div>
  );
};
