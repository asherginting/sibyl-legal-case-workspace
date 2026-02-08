import { OpenAPIV3 } from "openapi-types";

export const documentsPaths: OpenAPIV3.PathsObject = {
  "/cases/{id}/documents": {
    get: {
      tags: ["Documents"],
      summary: "List documents in a case (Client owner or Lawyer with access)",
      description:
        "List documents for a case owned by the client or accessible to the lawyer.",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Case ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Documents list",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  response_code: { type: "number" },
                  response_message: { type: "string" },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/DocumentItem",
                    },
                  },
                },
              },
            },
          },
        },
        "403": { description: "Forbidden" },
        "404": { description: "Case not found" },
      },
    },

    post: {
      tags: ["Documents"],
      summary: "Upload document to case (Client only)",
      description:
        "Upload a document to a case owned by the client (PDF, DOCX, PNG, JPG). Max size 5MB.",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Case ID",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
              required: ["file"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Document uploaded",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  response_code: { type: "number" },
                  response_message: { type: "string" },
                },
              },
            },
          },
        },
        "400": { description: "File required / invalid file" },
        "403": { description: "Forbidden" },
      },
    },
  },

  "/cases/{id}/documents/{documentId}": {
    get: {
      tags: ["Documents"],
      summary: "Download document (Client owner or Lawyer with access)",
      description:
        "Download a document from a case owned by the client or accessible to the lawyer.",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Case ID",
          schema: { type: "string" },
        },
        {
          name: "documentId",
          in: "path",
          required: true,
          description: "Document ID",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "File stream",
          content: {
            "application/octet-stream": {
              schema: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
        "403": { description: "Forbidden" },
        "404": { description: "Document not found" },
      },
    },
  },
};
