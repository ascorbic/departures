import { APIGatewayProxyHandler } from "aws-lambda";
import Darwin from "national-rail-darwin-promises";

export const handler: APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  console.log(event);
  const station = event.queryStringParameters?.station ?? "WSB";

  const client = new Darwin();

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
