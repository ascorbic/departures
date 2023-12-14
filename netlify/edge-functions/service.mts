import type { Config, Context } from "@netlify/edge-functions";
import { getDarwinClient } from "../get-darwin.mts";

export default async function handler(request: Request, context: Context) {
  const client = await getDarwinClient();
  const service = context.params.id;
  if (!service) {
    return new Response("No service specified", {
      status: 400,
    });
  }
  console.log("service", service);
  try {
    const { serviceDetails } = await client.getServiceDetails(service);

    return Response.json(serviceDetails);
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
