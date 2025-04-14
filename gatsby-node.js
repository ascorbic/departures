// load dotenv variables
require("dotenv").config();
console.log("RAILDATA_API_KEY", process.env.RAILDATA_API_KEY);

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  try {
    const response = await fetch(
      "https://api1.raildata.org.uk/1010-reference-data1_0/LDBSVWS/api/ref/20211101/GetStationList/1",
      {
        headers: {
          "x-apikey": process.env.RAILDATA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.StationList) {
      throw new Error("Invalid data structure");
    }

    if (Array.isArray(data.StationList)) {
      data.StationList.forEach((station) => {
        const node = {
          id: createNodeId(`stations-${station.crs}`),
          name: station.Value,
          crs: station.crs,
          internal: {
            type: "Stations",
            contentDigest: createContentDigest(station),
          },
        };
        createNode(node);
      });
    }
  } catch (error) {
    console.error("Error fetching station list:", error);
  }
};
