// jest.setup.ts
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import React from "react";

jest.mock("./src/lib/env", () => ({
  env: {
    API_URL:
      process.env.VITE_API_URL ||
      "https://vercel-api-desireemenezes-projects.vercel.app/",
  },
}));

global.React = React;

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
