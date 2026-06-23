import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    if (import.meta.env.DEV) {
      console.error(error);
    }
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const securityMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const result = await next();
    
    const setHeaderSafe = (obj: any, name: string, value: string) => {
      if (obj && obj.headers && typeof obj.headers.set === "function") {
        try {
          obj.headers.set(name, value);
        } catch (e) {
          // Silent catch for immutable headers
        }
      }
    };

    // Apply headers to the root object (if it is a response)
    setHeaderSafe(result, "X-Frame-Options", "DENY");
    setHeaderSafe(result, "X-Content-Type-Options", "nosniff");
    setHeaderSafe(result, "Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    setHeaderSafe(result, "Referrer-Policy", "strict-origin-when-cross-origin");
    setHeaderSafe(result, "X-XSS-Protection", "1; mode=block");

    // Apply headers to the nested response object (if in Vinxi/Nitro context)
    if (result && result.response) {
      setHeaderSafe(result.response, "X-Frame-Options", "DENY");
      setHeaderSafe(result.response, "X-Content-Type-Options", "nosniff");
      setHeaderSafe(result.response, "Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      setHeaderSafe(result.response, "Referrer-Policy", "strict-origin-when-cross-origin");
      setHeaderSafe(result.response, "X-XSS-Protection", "1; mode=block");
    }

    return result;
  } catch (err) {
    // Return default next response even if middleware logs fail
    return next();
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityMiddleware, errorMiddleware],
}));
