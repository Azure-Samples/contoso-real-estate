import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { existsSync, readFileSync } from "fs";
import yaml from "yamljs";
import * as swaggerUi from "swagger-ui-dist";

export async function openApi(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function openApi processed request for url "${request.url}"`);

  try {
    const filename = request.params.filename || "index.html";
    const format = request.params.format;
    const swaggerUiDistPath = swaggerUi.getAbsoluteFSPath();
    const filePath = swaggerUiDistPath + "/" + filename;
    const swaggerDocument = yaml.load("openapi.yaml");

    let mimetype = "text/html";
    let fileContent = "";

    if (format === "json") {
      return {
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(swaggerDocument),
      };
    }

    if (!existsSync(filePath)) {
      return {
        status: 404,
        jsonBody: {
          error: "File not found",
        },
      };
    }

    if (filename.endsWith("swagger-initializer.js")) {
      fileContent = `
      window.onload = function() {
        window.ui = SwaggerUIBundle({
          spec: ${JSON.stringify(swaggerDocument)},
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout"
        });
      };
    `;
    } else {
      fileContent = readFileSync(filePath).toString("utf-8");
    }

    if (filename.endsWith(".css")) {
      mimetype = "text/css";
    } else if (filename.endsWith(".js")) {
      mimetype = "application/javascript";
    } else if (filename.endsWith(".png")) {
      mimetype = "image/png";
    }

    return {
      headers: {
        "content-type": `${mimetype}; charset=utf-8`,
      },
      body: fileContent,
    };
  } catch (error: unknown) {
    const err = error as Error;
    context.error("Error...", err.message);
    return {
      status: 500,
      jsonBody: {
        error: "Internal server error",
      },
    };
  }
}
