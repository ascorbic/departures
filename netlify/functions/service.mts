import Darwin from "national-rail-darwin-promises";
import type { Config, Context } from "@netlify/functions";

const client = new Darwin();

export default async function handler(request: Request, context: Context) {
  const service = context.params.id;
  if (!service) {
    return new Response("No service specified", {
      status: 400,
    });
  }
  console.log("service", service);
  try {
    const result = await client.getServiceDetails(service);

    return Response.json(result);
  } catch (error: any) {
    console.log("Error", error);
    return new Response(error?.response?.statusText ?? "Error", {
      status: 500,
    });
  }
}

export const config: Config = {
  path: "/service/:id",
};
