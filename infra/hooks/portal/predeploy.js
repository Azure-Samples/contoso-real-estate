#!/usr/bin/env node

// This script is used to replace the blog URL in the portal environment

const { execSync } = require("node:child_process");
const { readFileSync, readdirSync, writeFileSync } = require("node:fs");
const { resolve, join } = require("node:path");

const shellCommand = `azd env get-values`;
const envVars = execSync(shellCommand).toString().trim();
const blogRegex = /SERVICE_BLOG_URI="([^"]+)"/;
const blogPlaceholderValue = "{{SERVICE_BLOG_URI_PLACEHOLDER}}";
const cmsRegex = /SERVICE_CMS_URI="([^"]+)"/;
const cmsPlaceholderValue = "{{SERVICE_CMS_URI_PLACEHOLDER}}";
const aiEnableRegex = /AI_ENABLE_CHAT="([^"]+)"/;
const aiEnablePlaceholderValue = '"{{AI_ENABLE_CHAT_PLACEHOLDER}}"';
const aiChatApiRegex = /AI_CHAT_API_URI="([^"]+)"/;
const aiChatApiPlaceholderValue = "{{AI_CHAT_API_URI_PLACEHOLDER}}";
const webPubSubUrlRegex = /SERVICE_WEB_PUB_SUB_URL="([^"]+)"/;
const webPubSubUrlPlaceholderValue = "{{SERVICE_WEB_PUB_SUB_URL_PLACEHOLDER}}";
const webPubSubPathRegex = /SERVICE_WEB_PUB_SUB_PATH="([^"]+)"/;
const webPubSubPathPlaceholderValue = "{{SERVICE_WEB_PUB_SUB_PATH_PLACEHOLDER}}";

// Note: this script is run by azd from the root of ./packages/portal
const distPath = resolve(__dirname, "../../../packages/portal/dist/contoso-app");

function replaceEnvURIs(filePath) {
  const matchBlog = envVars.match(blogRegex);
  const matchCms = envVars.match(cmsRegex);
  const matchWebPubSubUrl = envVars.match(webPubSubUrlRegex);
  const matchWebPubSubPath = envVars.match(webPubSubPathRegex);

  if (!matchBlog) {
    console.log(`No match found for ${blogPlaceholderValue}. Skipping replacement.`);
    process.exit(1);
  }
  if (!matchCms) {
    console.log(`No match found for ${cmsPlaceholderValue}. Skipping replacement.`);
    process.exit(1);
  }
  if (!matchWebPubSubUrl) {
    console.log(`No match found for ${webPubSubUrlPlaceholderValue}. Skipping replacement.`);
    process.exit(1);
  }
  if (!matchWebPubSubPath) {
    console.log(`No match found for ${webPubSubPathPlaceholderValue}. Skipping replacement.`);
    process.exit(1);
  }

  const blogValue = matchBlog[1];
  const cmsValue = matchCms[1];
  const webPubSubUrlValue = matchWebPubSubUrl[1];
  const webPubSubPathValue = matchWebPubSubPath[1];
  const fileContents = readFileSync(filePath, "utf-8");

  // Replace the placeholder with the actual value
  let newFileContent = fileContents
    .replace(blogPlaceholderValue, blogValue)
    .replace(cmsPlaceholderValue, cmsValue)
    .replace(webPubSubUrlPlaceholderValue, webPubSubUrlValue)
    .replace(webPubSubPathPlaceholderValue, webPubSubPathValue);

  // Special handling for AI chatbot
  const matchAiEnable = envVars.match(aiEnableRegex);
  const matchAiChatApi = envVars.match(aiChatApiRegex);
  const aiEnableValue = matchAiEnable ? matchAiEnable[1] : false;
  const aiChatApiValue = matchAiChatApi ? matchAiChatApi[1] : "";
  if (matchAiEnable && matchAiChatApi) {
    console.log(`AI chatbot is enabled. Chat API URI: ${aiChatApiValue}`);
  }

  newFileContent = newFileContent
    .replace(aiEnablePlaceholderValue, aiEnableValue)
    .replace(aiChatApiPlaceholderValue, aiChatApiValue);

  writeFileSync(filePath, newFileContent);

  process.exit(0);
}

function findMainFile(directoryPath) {
  try {
    const files = readdirSync(directoryPath);
    for (const file of files) {
      if (file.startsWith("main.")) {
        replaceEnvURIs(join(distPath, file));
        break;
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

findMainFile(distPath);
