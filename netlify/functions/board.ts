import Darwin from "national-rail-darwin-promises";
import { Handler } from "@netlify/functions";
import etag from "etag";

const client = new Darwin();

export const handler: Handler = async function handler(event, context) {
  const station = event.queryStringParameters?.station ?? "WSB";

  try {
    const result = await client.getArrivalsDepartureBoard(station, {});
    const etagHeader = etag(JSON.stringify(result));
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
      body: JSON.stringify({ message: result }),
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
