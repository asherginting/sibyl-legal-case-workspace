import { OpenAPIV3 } from "openapi-types";
import { authPaths } from "./auth.openapi";
import { casesPaths } from "./cases.openapi";
import { documentsPaths } from "./documents.openapi";
import { components } from "./components";

export const openApiSpec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "Sibyl Legal Case Workspace API",
    version: "1.0.0",
    description:
      "Sibyl Legal Case Workspace API Documentation v1.0.0 - by Asher Azriel Ginting",
  },
  servers: [
    {
      url: process.env.BACKEND_URL || "http://localhost:4000",
      description: "Production Environment",
    },
  ],
  paths: {
    ...authPaths,
    ...casesPaths,
    ...documentsPaths,
  },
  components,
};
