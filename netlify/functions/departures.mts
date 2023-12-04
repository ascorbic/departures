import Darwin from "national-rail-darwin-promises";
import type { Config, Context } from "@netlify/functions";

const client = new Darwin();

export default async function handler(request: Request, context: Context) {
  const station = context.params.crs || "WSB";
  console.log("station", station);
  try {
    const result = await client.getDepartureBoard(station, {});

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
