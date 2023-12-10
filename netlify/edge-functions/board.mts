import { Config, Context } from "@netlify/edge-functions";
import { getDarwinClient } from "../get-darwin.mts";

export default async function handler(_request: Request, context: Context) {
  const client = await getDarwinClient();
  const station = context.params?.station || "WSB";

  try {
    const result = await client.getArrivalsDepartureBoard(station, {});
    const trainServices = result.trainServices.map(
      ({
        eta,
        etd,
        sta,
        std,
        origin,
        destination,
        platform,
        delayReason,
      }: Record<string, any>) => ({
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
