import * as React from "react";
import { DepartureBoards } from "../components/departure-boards";
import { Layout } from "../components/layout";

const IndexPage = () => {
  const [crs, setCrs] = React.useState("WSB");

  return (
    <Layout>
      <DepartureBoards crs={crs} />
    </Layout>
  );
};

export default IndexPage;
