import { Handler } from "@netlify/functions";
import { stations } from "../../data/stations.json";

interface Station {
  name: string;
  crs: string;
  url: string;
}

function getHandler(): Handler {
  const stationList = new Map<string, Station>();
  stations.forEach((station: Station) => {
    stationList.set(station.crs.toLowerCase(), station);
  });
  return async (event) => {
    const crs = event.queryStringParameters?.code?.toLowerCase();
    console.log(`Looking up ${crs}`);
    const station = stationList.get(crs);
    return {
      statusCode: 302,
      headers: {
        Location: station?.url || "/404/",
      },
    };
  };
}

export const handler: Handler = getHandler();
