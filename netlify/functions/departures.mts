import Darwin from "national-rail-darwin-promises";
import type { Config, Context } from "@netlify/functions";
import { stations } from "../../data/stations.json";

const client = new Darwin();

interface Station {
  name: string;
  crs: string;
  url: string;
}

const stationList = new Map<string, Station>();
stations.forEach((station: Station) => {
  stationList.set(station.crs.toLowerCase(), station);
});

export default async function handler(request: Request, context: Context) {
  const station = context.params.crs || "WSB";
  console.log("station", station);
  try {
    const result = await client.getDepartureBoard(station, {});
    result.generatedAt = new Date().toISOString();
    result.locationName =
      stationList.get(station.toLowerCase())?.name ?? "Unknown";

    return Response.json(result);
  } catch (error: any) {
    console.log("Error", error);
    return new Response(error?.response?.statusText ?? "Error", {
      status: 500,
    });
  }
}

export const config: Config = {
  path: "/departures/:crs",
};
