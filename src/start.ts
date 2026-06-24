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

    const secHeaders: [string, string][] = [
      ["X-Frame-Options", "DENY"],
      ["X-Content-Type-Options", "nosniff"],
      ["Strict-Transport-Security", "max-age=31536000; includeSubDomains"],
      ["Referrer-Policy", "strict-origin-when-cross-origin"],
      ["X-XSS-Protection", "1; mode=block"],
      ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"],
      ["Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.google.com;"],
    ];

    for (const [name, value] of secHeaders) {
      setHeaderSafe(result, name, value);
    }

    if (result && result.response) {
      for (const [name, value] of secHeaders) {
        setHeaderSafe(result.response, name, value);
      }
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
