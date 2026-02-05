import { OpenAPIV3 } from "openapi-types";

export const components: OpenAPIV3.ComponentsObject = {
  securitySchemes: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "auth_token",
    },
  },

  schemas: {
    ErrorResponse: {
      type: "object",
      properties: {
        response_code: { type: "number" },
        response_message: { type: "string" },
      },
    },
    AuthUser: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        email: { type: "string", format: "email" },
        role: { type: "string", enum: ["CLIENT", "LAWYER"] },
      },
    },
    CaseCard: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        title: { type: "string" },
        description: { type: "string" },
        category: { type: "string" },
        jurisdiction: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        clientLabel: { type: "string" },
        attachmentsCount: { type: "number" },

        access: {
          type: "object",
          properties: {
            status: {
              type: "string",
              nullable: true,
              enum: ["GRANTED", "REVOKED"],
            },
            grantedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
        },

        actions: {
          type: "object",
          properties: {
            canOpen: { type: "boolean" },
            canRequestAccess: { type: "boolean" },
            canWithdraw: { type: "boolean" },
          },
        },
      },
    },

    CaseDetail: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        status: { type: "string", enum: ["OPEN", "CLOSED"] },
        category: { type: "string" },
        jurisdiction: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        summary: { type: "string" },
        parties: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              role: { type: "string" },
            },
          },
        },
        keyEvents: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string" },
              description: { type: "string" },
              documents: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },

    DocumentItem: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        originalName: { type: "string" },
        mimeType: { type: "string" },
        size: { type: "number" },
        uploadedBy: {
          type: "object",
          properties: {
            id: { type: "string" },
            role: { type: "string", enum: ["CLIENT", "LAWYER"] },
          },
        },
        createdAt: { type: "string", format: "date-time" },
      },
    },
  },
};
