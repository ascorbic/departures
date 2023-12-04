import { Config } from "@netlify/functions";
import { stations } from "../../data/stations.json";

interface Station {
  name: string;
  crs: string;
  url: string;
}

const stationList = new Map<string, Station>();
stations.forEach((station: Station) => {
  stationList.set(station.crs.toLowerCase(), station);
});

export default function handler(request: Request) {
  const url = new URL(request.url);

  const crs = url.searchParams.get("crs")?.toLowerCase() ?? "wsb";
  console.log(`Looking up ${crs}`);
  const station = stationList.get(crs);
  return Response.redirect(new URL(station?.url ?? "/404", url));
}

export const config: Config = {
  method: "GET",
  path: "/station",
};
