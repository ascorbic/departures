import * as React from "react";
import { graphql } from "gatsby";
import { DepartureBoards } from "../components/departure-boards";
import { Layout } from "../components/layout";
import { useCurrentTimeString } from "../utils/hooks";
import { StationSearch } from "../components/station-search";

export default function StationPage({ data }) {
  const time = useCurrentTimeString();
  return (
    <Layout>
      <StationSearch initial={data.station.name} />
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
