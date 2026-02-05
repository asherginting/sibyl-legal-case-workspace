import { OpenAPIV3 } from "openapi-types";

export const casesPaths: OpenAPIV3.PathsObject = {
  "/cases": {
    get: {
      tags: ["Cases"],
      summary: "Browse cases",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "page", in: "query", schema: { type: "number" } },
        { name: "limit", in: "query", schema: { type: "number" } },
        { name: "search", in: "query", schema: { type: "string" } },
        { name: "category", in: "query", schema: { type: "string" } },
        { name: "jurisdiction", in: "query", schema: { type: "string" } },
        {
          name: "posted",
          in: "query",
          schema: { type: "string", enum: ["any", "7d", "30d"] },
        },
        {
          name: "sort",
          in: "query",
          schema: { type: "string", enum: ["recent", "oldest"] },
        },
      ],
      responses: {
        "200": {
          description: "Cases list",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  response_code: { type: "number" },
                  response_message: { type: "string" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/CaseCard" },
                  },
                  page: {
                    type: "object",
                    properties: {
                      page_number: { type: "number" },
                      page_size: { type: "number" },
                      limit: { type: "number" },
                      total: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Cases"],
      summary: "Create case (CLIENT only)",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              required: ["title", "category"],
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                category: { type: "string" },
                jurisdiction: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Case created",
        },
        "403": {
          description: "Forbidden",
        },
      },
    },
  },

  "/cases/{id}": {
    get: {
      tags: ["Cases"],
      summary: "Get case detail",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Case detail",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CaseDetail" },
            },
          },
        },
        "404": { description: "Case not found" },
      },
    },

    patch: {
      tags: ["Cases"],
      summary: "Update case (CLIENT only)",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                category: { type: "string" },
                jurisdiction: { type: "string" },
                status: { type: "string", enum: ["OPEN", "CLOSED"] },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "Updated" },
        "403": { description: "Forbidden" },
      },
    },

    delete: {
      tags: ["Cases"],
      summary: "Delete case (CLIENT only)",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": { description: "Deleted" },
        "403": { description: "Forbidden" },
      },
    },
  },

  "/cases/{id}/access/request": {
    post: {
      tags: ["Cases"],
      summary: "Request access (LAWYER only)",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "Access requested" },
        "403": { description: "Forbidden" },
      },
    },
  },

  "/cases/{id}/access/withdraw": {
    post: {
      tags: ["Cases"],
      summary: "Withdraw access (LAWYER only)",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        "200": { description: "Access withdrawn" },
        "400": { description: "Invalid state" },
      },
    },
  },
};
