import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { existsSync, readFileSync } from "fs";
import yaml from "yamljs";

import * as swaggerUi from "swagger-ui-dist";

const openApi: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const filename = req.params.filename || "index.html";
  const format = req.query.format;
  const swaggerUiDistPath = swaggerUi.getAbsoluteFSPath();
  const filepath = swaggerUiDistPath + "/" + filename;
  const swaggerDocument = yaml.load("openapi.yaml");
  let mimetype = "text/html";
  let fileContent = "";

  context.log("format", format);

  if (format === "json") {
    context.res = {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(swaggerDocument),
    };
    return;
  }

  if (!existsSync(filepath)) {
    context.res = {
      status: 404,
    };
    return;
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

  context.res = {
    headers: {
      "content-type": `${mimetype}; charset=utf-8`,
    },
    body: fileContent,
  };
};

export default openApi;
