import Darwin from "national-rail-darwin-promises";
import { Config, Context } from "@netlify/functions";

const client = new Darwin();

export default async function handler(request: Request, context: Context) {
  const station = context.params?.station || "WSB";

  try {
    const result = await client.getArrivalsDepartureBoard(station, {});
    const trainServices = result.trainServices.map(
      ({ eta, etd, sta, std, origin, destination, platform, delayReason }) => ({
        eta,
        etd,
        sta,
        std,
        origin,
        destination,
        platform,
        delayReason,
      })
    );
    return Response.json(trainServices);
  } catch (error: any) {
    console.log("Error", error?.response);
    return new Response(error?.response?.statusText ?? "Error", {
      status: 500,
    });
  }
}

export const config: Config = {
  method: "GET",
  path: "/board/:station",
};
