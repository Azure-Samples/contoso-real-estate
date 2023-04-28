const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const filePath = "packages/portal/src/environments/environment.prod.ts";
const oldValue = "https://aka.ms/contoso-real-estate/blog-prod";
const shellCommand = `azd env get-values`;
const regex = /SERVICE_BLOG_URI="([^"]+)"/;

const newValue = execSync(shellCommand).toString().trim();
const match = newValue.match(regex);

if (match) {
  const value = match[1];
  const fileContents = readFileSync(filePath, "utf-8");
  const newFileContents = fileContents.replace(oldValue, value);
  writeFileSync(filePath, newFileContents);

  process.exit(0);

} else {
  process.exit(1);
}
