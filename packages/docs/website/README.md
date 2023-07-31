# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## 1. Docusaurus Setup
Expand the sections below for more details on the setup.

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



## 2. Local Development

Change to the `website/` folder. Check that you have Node.js v18+ in your local environment, then install dependencies.

```bash
$ nvm use --lts
Now using node v18.17.0 (npm v9.6.7)
$ cd website
$ npm install
```
Run the dev server to preview site locally:

```bash
$ npx docusaurus start 
```
This starts a local development server and opens up a browser window to the server URL by default. Most changes are reflected live without having to restart the server. 

## 3. Production Build

You can now build the site for production:

```
$ npx docusaurus build
[INFO] [en] Creating an optimized production build...
...
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.
```

This command generates static content into the `build/` directory and can be served using any static contents hosting service. You can also preview the production build locally:

```
$npx docusaurus serve
? [WARNING] Something is already running on port 3000. 
...
Would you like to run the app on another port instead? … yes
[SUCCESS] Serving "build" directory at: http://localhost:3001/
```

As shown, if the default port (3000) is in use, the process automatically prompts you to allow an alternative - then launches the browser to the final URL for local preview of the build version.

## 4. Production Deployment

The static build can be deployed to any static site hosting service. Check the [Deployment](https://docusaurus.io/docs/deployment) documentation for details. 

The process has been validated for Azure Static Web Apps and GitHub Pages options. Deploying to GitHub pages [is particularly easy](https://docusaurus.io/docs/deployment#deploying-to-github-pages).

 1.  [Update `docusaurus.config.js` settings](https://docusaurus.io/docs/deployment#docusaurusconfigjs-settings).
 2.  [Deploy manually with `yarn deploy`](https://docusaurus.io/docs/deployment#deploy)
 3. [Automate build/deploy with GitHub Actions](https://docusaurus.io/docs/deployment#triggering-deployment-with-github-actions)


## Troubleshooting

This section will be used to document any issues, gotchas, tips and tricks for use with Docusaurus.