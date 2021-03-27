import * as React from "react";
import { DepartureBoards } from "../components/departure-boards";
import { Layout } from "../components/layout";
import { useCurrentTimeString } from "../utils/hooks";

const IndexPage = () => {
  const [crs, setCrs] = React.useState("WSB");
  const time = useCurrentTimeString();

  return (
    <Layout>
      <DepartureBoards crs={crs} time={time} />
    </Layout>
  );
};

export default IndexPage;
