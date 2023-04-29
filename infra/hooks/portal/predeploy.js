#!/usr/bin/env node

// This script is used to replace the blog URL in the portal environment

const { execSync } = require("node:child_process");
const { readFileSync, readdirSync, writeFileSync } = require("node:fs");
const { resolve, join } = require("node:path");

const shellCommand = `azd env get-values`;
const envVars = execSync(shellCommand).toString().trim();
const regex = /SERVICE_BLOG_URI="([^"]+)"/;
const oldValue = "SERVICE_BLOG_URI_PLACEHOLDER";
// Note: this script is run by azd from the root of ./packages/portal
const distPath = resolve(__dirname, "../../../packages/portal/dist/contoso-app");

function replaceBlogUrl(filePath) {
  const match = envVars.match(regex);

  if (match) {
    const value = match[1];
    const fileContents = readFileSync(filePath, "utf-8");
    const newFileContents = fileContents.replace(oldValue, value);
    writeFileSync(filePath, newFileContents);
    console.log(`Replaced ${oldValue} with ${value} in ${filePath}`);
  }
  else {
    console.log(`No match found for ${regex}. Skipping replacement.`);
  }
}

function findMainFile(directoryPath) {
  try {
    const files = readdirSync(directoryPath);
    for (const file of files) {
      if (file.startsWith("main.")) {
        replaceBlogUrl(join(distPath, file));
        break;
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

findMainFile(distPath);
