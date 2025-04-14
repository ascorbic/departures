import * as React from "react";
import { Layout } from "../components/layout";
import { useCurrentTime } from "../utils/hooks";
import { graphql } from "gatsby";

import { StationSearch } from "../components/station-search";
import { DepartureBoards } from "../components/departure-boards";
import slugify from "slugify";

const IndexPage = ({ data }) => {
  console.log(data);
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
        name
        crs
        url: gatsbyPath(filePath: "/{Stations.name}")
      }
    }
  }
`;
