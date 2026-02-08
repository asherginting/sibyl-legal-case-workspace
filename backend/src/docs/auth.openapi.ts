import { OpenAPIV3 } from "openapi-types";

export const authPaths: OpenAPIV3.PathsObject = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user (Client or Lawyer)",
      description: "Authenticate user and set auth_token cookie.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "user@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "secret-password",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Login success",
          headers: {
            "Set-Cookie": {
              schema: { type: "string" },
              description: "auth_token cookie",
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: { $ref: "#/components/schemas/AuthUser" },
                },
              },
            },
          },
        },
        "400": {
          description: "Missing email or password",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "401": {
          description: "Invalid email or password",
        },
      },
    },
  },

  "/auth/me": {
    get: {
      tags: ["Auth"],
      summary: "Get current authenticated user (Client or Lawyer)",
      description: "Return information about the currently authenticated user.",
      security: [{ cookieAuth: [] }],
      responses: {
        "200": {
          description: "Authenticated user",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: { $ref: "#/components/schemas/AuthUser" },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthenticated",
        },
      },
    },
  },

  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user (Client or Lawyer)",
      description: "Logout current user and clear auth_token cookie.",
      responses: {
        "204": {
          description: "Logged out successfully",
        },
      },
    },
  },
};
