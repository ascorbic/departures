import * as React from "react";
import { graphql } from "gatsby";
import { DepartureBoards } from "../components/departure-boards";
import { StationName } from "../components/station-name";
import { Layout } from "../components/layout";

export default function StationPage({ data }) {
  return (
    <Layout>
      <StationName>{data.station.name}</StationName>
      <DepartureBoards crs={data.station.crs} />
    </Layout>
  );
}

export const query = graphql`
  query($id: String) {
    station: stationsCsv(id: { eq: $id }) {
      name
      crs
    }
  }
`;
