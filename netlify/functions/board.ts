import Darwin from "national-rail-darwin-promises";
import { Handler } from "@netlify/functions";

const client = new Darwin();

export const handler: Handler = async function handler(event, context) {
  const station = event.queryStringParameters?.station ?? "WSB";

  try {
    const result = await client.getArrivalsDepartureBoard(station, {});
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result }),
    };
  } catch (e) {
    console.log(e);
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ message: "Error" }),
  };
};
