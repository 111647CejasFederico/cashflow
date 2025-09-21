import swaggerJSDoc from "swagger-jsdoc";
import { resolve } from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Auto-generated Swagger docs",
    },
  },
  apis: [resolve(process.cwd(), "src/routes/**/*.ts"), resolve(process.cwd(), "src/types/api-responses/**/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
