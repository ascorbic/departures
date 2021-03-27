import * as React from "react";
import { Layout } from "../components/layout";
import { useCurrentTimeString } from "../utils/hooks";
import { StationSearch } from "../components/station-search";
import { DepartureBoards } from "../components/departure-boards";

const IndexPage = () => {
  const time = useCurrentTimeString();

  return (
    <Layout>
      <StationSearch />
      <DepartureBoards crs={"WSB"} time={time} />
    </Layout>
  );
};

export default IndexPage;
