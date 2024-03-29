import { Config, Context } from "@netlify/edge-functions";
import stationJson from "../../data/stations.json" assert { type: "json" };

interface Station {
  name: string;
  crs: string;
  url: string;
}

const stationList = new Map<string, Station>();
stationJson.stations.forEach((station: Station) => {
  stationList.set(station.crs.toLowerCase(), station);
});

export default function handler(request: Request, context: Context) {
  const url = new URL(request.url);

  const crs = context.params?.crs?.toLowerCase() ?? "wsb";
  console.log(`Looking up ${crs}`);
  const station = stationList.get(crs);
  return Response.redirect(new URL(station?.url ?? "/404", url));
}

export const config: Config = {
  method: "GET",
  path: "/station/:crs",
};
