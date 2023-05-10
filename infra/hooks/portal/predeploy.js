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

// Note: this script is run by azd from the root of ./packages/portal
const distPath = resolve(__dirname, "../../../packages/portal/dist/contoso-app");

function replaceEnvURIs(filePath) {
  const matchBlog = envVars.match(blogRegex);
  const matchCms = envVars.match(cmsRegex);

  if (matchBlog && matchCms) {
    const blogValue = matchBlog[1];
    const cmsValue = matchCms[1];
    const fileContents = readFileSync(filePath, "utf-8");
    const newFileContent = fileContents.replace(blogPlaceholderValue, blogValue)
                                        .replace(cmsPlaceholderValue, cmsValue);

    writeFileSync(filePath, newFileContent);

    console.log(`Replaced ${blogPlaceholderValue} with ${blogValue} in ${filePath}`);
    console.log(`Replaced ${cmsPlaceholderValue} with ${cmsValue} in ${filePath}`);
  }
  else {
    if (!matchBlog) {
      console.log(`No match found for ${blogPlaceholderValue}. Skipping replacement.`);
    }
    if (!matchCms) {
      console.log(`No match found for ${cmsPlaceholderValue}. Skipping replacement.`);
    }
  }
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
