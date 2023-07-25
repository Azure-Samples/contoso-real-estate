# Setup: Website & Testing
This document captures the steps taken to scaffold, configure, and customize, the development environment for the developer guide website. There are 3 main sections:
 - Docusaurus = setting up the static site generator for website content
 - Playwright = setting up the test runner for end-to-end tesitng of website
 - Troubleshooting = captures any additional tips or tricks required for usage

---


## 1. Docusaurus: Setup Website

<details>
<summary> 1. Scaffold Classic Site </summary>

We started by creating the default "classic" Docusaurus site in the `website` folder under the `docs` package.

```bash
# Create a package called docs
$ cd packages
$ mkdir docs

# Verify you have Node.js v18+
$ nvm use --lts  
Now using node v18.17.0 (npm v9.6.7)

# Scaffold a "classic" site in `website` folder
$ cd docs
$ npx create-docusaurus@latest website classic

# Verify website builds for local preview
$ cd website
$ npx docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```
</details>


<details>
<summary> 2. Customize Configuration </summary>

Docusaurus configuration is done through one main file - `docusaurus.config.js`. It helps to understand three core concepts: themes, plugins and presets.
 - Docusaurus [themes](https://docusaurus.io/docs/api/themes) implement the user interface of website pages and views. Currently [theme-classic](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic) is the only officially-supported theme.
 - Docusaurus [plugins](https://docusaurus.io/docs/using-plugins) implement functionality that are activated to provide site features. The Docusaurus core has no features on its own; everything is plugin-based, with [official](https://docusaurus.io/docs/api/plugins) and [community-based](https://docusaurus.io/community/resources#community-plugins) plugins available.
 - Docusuaurus [presets](https://docusaurus.io/docs/using-plugins#using-presets) are "bundles" of plugins that are often activated together (e.g, used by a specific theme). For instance, the default _classic_ theme preset contains the docs, blog and pages plugins.

Each of the above has a section in the `docusaurus.config.js` where it can be customized - typically plugins that are part of a preset will be configured in that section, while others get configured in the plugins section. _However, read the plugin-specific requirements to verify requirements_. Read [the documentation](https://docusaurus.io/docs/api/docusaurus-config) for all the details, then look at the config file in the repo to understand changes made.

In addition to this, we have two other files that see a lot of configuration changes:
 - [sidebars.js](https://docusaurus.io/docs/sidebar#default-sidebar) for the "docs" collections
 - [custom.css](https://docusaurus.io/docs/styling-layout) for global style changes

</details>


<details>
<summary> 3. Install Plugins, Themes, Dependencies </summary>

We'll document any non-preset plugins we install in this section for reference.

1. [plugin-sitemap](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap) - for sitemap.xml in deploy
2. [plugin-ideal-image](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image) - for efficient image loads
3. [theme-mermaid](https://docusaurus.io/docs/markdown-features/diagrams#configuration) - for rendering mermaid diagrams
4. [swagger-ui-react](https://www.npmjs.com/package/swagger-ui-react) - for rendering OpenAPI docs

</details>

<details>
<summary> 4. Create Components </summary>

Docusaurus has the following [core concepts](https://docusaurus.io/docs/category/guides) to help with content creation and site configuration. Content can be authored as Markdown _or_ as [MDX (enhanced Markdown)](https://docusaurus.io/docs/markdown-features/react) which helps you bring custom React components into Markdown files. 

This can be a useful way to _template_ a specific element or section of a page in a way that allows us to "stamp out" instances with different data bindings. It also enables us to make these elements interactive and style them differently for enhanced effect. _However components will add cost and complexity so use with care. Remember that Markdown can also embed HTML directly with less overheads_.

We'll use this section to document any custom components created. From a code perspective, these can typically be found under `src/components`. Note that if we choose to test with Playwright, there is [experimental support for component testing](https://playwright.dev/docs/test-components#step-1-install-playwright-test-for-components-for-your-respective-framework) that we may be able to use for validation.

</details>

<details>
<summary> 5. Other Enhancements </summary>

### 5.1 Swagger API Docs

The app uses an OpenAPI (Swagger) specification for the core APIs that abstract backend functionality from the front-end UI. Automate docs creation from the YAML as follows:

```bash
# Create yml folder for YAML files under static/
$ cd website/static
$ mkdir yml

# Soft link packages/api/openapi.yaml file
# to openapi.yml here
$ ln -s ../../../../api/openapi.yaml .

# Install the swagger-ui-react package
$ cd website
$ npm i --save swagger-ui-react

# Add api.js file in /src/pages (maps to /api)
$ cd website
$ touch pages/api.js

# Update it to show a <SwaggerUI> element
# sourced from the yaml (see updated file)

# Update navbar in docusaurus.config.js
# to add an API item linked to /api
```

Since the YAML is soft-linked to the original source, the docs should reflect the latest chamges to the code. You can now see the API docs at /api on website. 

</details>


## 2. Playwright: Setup Tests

<details>
<summary> 1. Install Playwright </summary>

To get started with Playwright, you can pick one of two options:
 - Use the [commandline](https://playwright.dev/docs/test-components#step-1-install-playwright-test-for-components-for-your-respective-framework)
 - Use the [VS Code extension](https://playwright.dev/docs/getting-started-vscode).

 We'll use the first option here for completeness, but will rely primarily on the second for all authoring, running, and debugging actions. Please [install the Playwright extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) if you have not already done so.

Here's how we installed Playwright:
```bash
# Use valid Node.js environment
$ nvm use --lts
Now using node v18.17.0 (npm v9.6.7)

# Check current Playwright stable release
$ npx playwright --version
Version 1.36.2

# Initialize Playwright setup in website/
# Use defaults for all questions asked during install
$ cd packages/docs/website
$ npm init playwright@latest
Need to install the following packages:
  create-playwright@1.17.128
Ok to proceed? (y) 

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · TypeScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
..
..

Happy hacking! 🎭
```

_What did this do? Here are the main file changes:_

1. Updated website/.gitignore to ignore the following if present
    - test-results/, playwright-report/, playwright/.cache 
2. Updated website/package.json and website/package-lock.json
    - Added @playwright/test dependencies and version ^1.36.2
3. Added the playwright configuration file
    - See `playwright.config.ts`
4. Added  playwright test specification starter & demo files
    - Starter: `tests/example.spec.ts`
    - Demo: `tests-examples\demo-todo-app.spec.ts`

We'll primarily focus on the configuration file and test specifications in the `tests/` folder. 
 - Add `/tests-examples` to `website/.gitignore`. This lets us explore and use it for understanding initially, but not commit it to repo for long term.
 -  Rename `example.spec.ts` to `website.spec.ts`. This is our core test spec.

Let's validate that Playwright was setup correctly. We can walk through the commands recommended in the setup output:

```bash
# -- set current working directory as website/
$ cd website/

# Run end-to-end tests
$ npx playwright test
Running 6 tests using 6 workers
...

# Open last report
$ npx playwright show-report
Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.

# Starts the interactive UI mode.
# This launches a Trace Viewer like window for live test results
$ npx playwright test --ui   

# Runs the tests only on Desktop Chrome.
$ npx playwright test --project=chromium
Running 2 tests using 2 workers
...
    
# Runs the tests in a specific file.
# File must be in the subtree of `testDir` folder specified in config
# Ex: the command below looks for tests/*/website.spec.ts 
$ npx playwright test website
Running 6 tests using 6 workers
...
    
# Runs the tests in debug mode.
# This launches headless browser with a Playwright Inspector window beside it
$ npx playwright test --debug    
Running 6 tests using 1 worker
...
```

Note that running tests will create two directories that are .gitignored.
 -  `test-results/` = contain artifacts generated by tests
 -  `playwright-report/` = contains artifacts generated by html-reporter

Later, we'll switch to doing these actions using VS Code extensions. And we can configure the folder locations and other parameters via the CLI or config file.

</details>

<details>
<summary> 2. Customize Test Configuration </summary>
</details>

<details>
<summary> 3. Customize Test Specification </summary>
</details>

<details>
<summary> 4. Understand Core Tooling </summary>
</details>

## 3. Troubleshooting

This section will be used to document any issues, gotchas, tips and tricks for use with Docusaurus or Playwright.

