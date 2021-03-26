import { APIGatewayProxyHandler } from "aws-lambda";
export const handle: APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
