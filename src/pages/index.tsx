import * as React from "react";
import { Layout } from "../components/layout";
import { useCurrentTime } from "../utils/hooks";
import { StationSearch } from "../components/station-search";
import { DepartureBoards } from "../components/departure-boards";

const IndexPage = () => {
  return (
    <Layout>
      <StationSearch />
      <DepartureBoards crs={"WSB"} />
    </Layout>
  );
};

export default IndexPage;
