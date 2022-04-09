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
  return async (event, context) => {
    const { pathname } = new URL(event.rawUrl);
    const crs = pathname.split("/").filter(Boolean).pop()?.toLowerCase() ?? "";
    console.log(`Looking up ${crs}`);
    const station = stationList.get(crs);
    if (station) {
      return {
        statusCode: 302,
        headers: {
          Location: station.url,
        },
      };
    }
    return {
      statusCode: 302,
      headers: {
        Location: "/404/",
      },
    };
  };
}

export const handler: Handler = getHandler();
