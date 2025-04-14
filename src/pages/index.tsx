import * as React from "react";
import { Layout } from "../components/layout";
import { graphql } from "gatsby";

import { StationSearch } from "../components/station-search";
import { DepartureBoards } from "../components/departure-boards";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <StationSearch allStations={data.allStations.nodes} />
      <DepartureBoards crs={"WSB"} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allStations {
      nodes {
        crs
        name
        url: gatsbyPath(filePath: "/{Stations.name}")
      }
    }
  }
`;
