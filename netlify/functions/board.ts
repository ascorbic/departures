import Darwin from "national-rail-darwin-promises";
import { Handler } from "@netlify/functions";
import zlib from "zlib";
import accepts from "accepts";
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

    let body = JSON.stringify({ message: result });

    const headers = {
      "Content-Type": "application/json",
      ETag: etagHeader,
    };

    let isBase64Encoded = false;
    if (event.headers["accept-encoding"]?.includes("br")) {
      body = zlib.brotliCompressSync(body).toString("base64");
      isBase64Encoded = true;
      headers["Content-Encoding"] = "br";
    }

    console.log(headers);
    return {
      statusCode: 200,
      body,
      headers,
      isBase64Encoded,
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
