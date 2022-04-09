import Darwin from "national-rail-darwin-promises";
import { Handler } from "@netlify/functions";
import etag from "etag";
import { withCompression } from "../withCompression";

const client = new Darwin();

const handlerFn: Handler = async (event) => {
  const station = event.queryStringParameters?.station || "WSB";

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
    const body = JSON.stringify({ message: { trainServices } });
    const etagHeader = etag(body);
    if (etagHeader && event.headers["if-none-match"] === etagHeader) {
      return {
        statusCode: 304,
        headers: {
          "Content-Type": "application/json",
          ETag: etagHeader,
        },
      };
    }

    return {
      statusCode: 200,
      body,
      headers: {
        "Content-Type": "application/json",
        ETag: etagHeader,
      },
    };
  } catch (error: any) {
    console.log("Error", error?.response);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error?.response?.statusText ?? "Error",
      }),
    };
  }
};

export const handler = withCompression(handlerFn);
