import * as React from "react";
import { graphql } from "gatsby";
import { DepartureBoards } from "../components/departure-boards";
import { StationName } from "../components/station-name";
import { Layout } from "../components/layout";
import { useCurrentTimeString } from "../utils/hooks";

export default function StationPage({ data }) {
  const time = useCurrentTimeString();
  return (
    <Layout>
      <StationName name={data.station.name} />
      <DepartureBoards crs={data.station.crs} time={time} />
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
