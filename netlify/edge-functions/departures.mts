import type { Config, Context } from "@netlify/edge-functions";
import { getDarwinClient } from "../get-darwin.mts";

export default async function handler(_request: Request, context: Context) {
  const client = await getDarwinClient();
  const station = context.params.crs || "WSB";
  console.log("station", station);
  try {
    const result = await client.getDepartureBoardWithDetails(station, {});

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
