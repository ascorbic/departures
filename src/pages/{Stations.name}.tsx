import * as React from "react";
import { graphql } from "gatsby";
import { DepartureBoards } from "../components/departure-boards";
import { Layout } from "../components/layout";
import { StationSearch } from "../components/station-search";
export default function StationPage({ data }) {
  return (
    <Layout title={`${data.station.name} Live Departures and Arrivals`}>
      <StationSearch
        initial={data.station.name}
        allStations={data.allStations.nodes}
      />
      <DepartureBoards crs={data.station.crs} />
    </Layout>
  );
}

export const query = graphql`
  query ($id: String) {
    station: stations(id: { eq: $id }) {
      name
      crs
    }
    allStations {
      nodes {
        name
        crs
      }
    }
  }
`;

export async function config() {
  return () => {
    return {
      defer: true,
    };
  };
}
