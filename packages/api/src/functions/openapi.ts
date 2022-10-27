import type { HttpHandler } from "@azure/functions";
import { existsSync, readFileSync } from "fs";
import yaml from "yamljs";
import * as swaggerUi from "swagger-ui-dist";

export const openApi: HttpHandler = async (context, req) => {
  const filename = req.params.filename || "index.html";
  const swaggerUiDistPath = swaggerUi.getAbsoluteFSPath();
  const filepath = swaggerUiDistPath + "/" + filename;
  const swaggerDocument = yaml.load("openapi.yaml");
  let mimetype = "text/html";
  let fileContent = "";

  if (!existsSync(filepath)) {
    return {
      status: 404,
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
    fileContent = readFileSync(filepath).toString("utf8");
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
};
