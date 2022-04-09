import {
  HandlerResponse,
  HandlerEvent,
  HandlerContext,
  Handler,
} from "@netlify/functions";

import { brotliCompressSync, gzipSync, deflateSync } from "zlib";

interface PromiseHandler extends Handler {
  (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse>;
}

type Encoding = "br" | "gzip" | "deflate";

function compressResponse(
  response: HandlerResponse,
  format: Encoding
): HandlerResponse {
  let data;
  switch (format) {
    case "br":
      data = brotliCompressSync(response.body);
      break;
    case "gzip":
      data = gzipSync(response.body);
      break;
    case "deflate":
      data = deflateSync(response.body);
      break;
    default:
      data = response.body;
  }
  response.headers["Content-Encoding"] = format;
  response.headers["Content-Length"] = data.length;
  response.body = data.toString("base64");
  response.isBase64Encoded = true;
  return response;
}

function acceptEncoding(header: string): Encoding | undefined {
  if (!header) {
    return undefined;
  }
  for (const iterator of ["br", "gzip", "deflate"] as const) {
    if (header.includes(iterator)) {
      return iterator;
    }
  }
}

export function withCompression(handler: Handler): PromiseHandler {
  return async function handlerWithCompression(event, context) {
    const accept = event.headers["accept-encoding"];
    const response = (await handler(event, context)) as HandlerResponse;
    if (
      !accept ||
      response.headers?.hasOwnProperty("content-encoding") ||
      response.isBase64Encoded ||
      response.statusCode !== 200
    ) {
      return response;
    }
    return compressResponse(response, acceptEncoding(accept));
  };
}
