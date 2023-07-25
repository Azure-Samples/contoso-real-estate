# Contoso Real Estate: Developer Guide

Welcome to the documentation site for the Contoso Real Estate reference implemenation. _This is a work in progress and contributions are welcome_.

## About This Guide

The guide is implemented as a a static website using the [Docusaurus](https://docusaurus.io) framework, with content authored in Markdown. _It is meant to be used in local preview but you can configure your fork to run this at the GitHub Pages endpoint, or deploy to Azure Static Web Apps_.

The guide also comes with its own [Playwright](https://playwright.dev) test suite for validating the developer guide routes and resources. _This test suite is not part of the end-to-end testing strategy for the Contoso Real Estate Application itself_ and should be viewed as separate.


## Website: Setup

Read the [SETUP](SETUP.md) guide to learn how the website was scaffolded, configured and customized. The `website/` folder contains the following files after initial setup - the commented files are the primary places for content or configuration changes for the website.

```bash
.docusaurus/             
.gitignore               
README.md  
babel.config.js  
blog/                     # Content: type=blog
docusaurus.config.js      # Config: Docusaurus setup     
docs/                     # Content: type=tutorials
node_modules              
package.json   
package-lock.json        
sidebars.js               # Config: Sidebars in tutorials content
src/                      # Content: type=static pages
static/                   # Content: type=static assets
```


## Website: Local Preview

This section will focus only on how you can build and preview the website locally.

```bash
# Verify you have Node.js v18+ running
$ nvm use --lts
Now using node v18.16.0 (npm v9.5.1)

# Change to the website directory within the repo
$ cd packages/docs/website

# Build the website, then preview it locally
$ npm install
$ npx docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/

# 🎉 You can now explore the developer guide locally!
```

Any changes you make to the website source (under `package/docs/website`) should now be instantly visible under the website preview.

## Website: Production Build

Building the website for production, and deploying it to popular hosting services, is fairly straightforward - if you want to explore this on your own fork of the repo.

Here's how you build the website for production:

```bash
$ npx docusaurus build
[INFO] [en] Creating an optimized production build...
..
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.
```

Preview the build as shown - it should launch on the standard port (3000). If this is in use, it will automatically ask to use an alternative port and launch the browser to preview that build.

```bash
$ npm run serve

$ ? [WARNING] Something is already running on port 3000. [..snipped..]

Would you like to run the app on another port instead? › (Y/n)
[SUCCESS] Serving "build" directory at: http://localhost:3001/
```

To deploy the production build to a hosting service, check out the [Docusaurus Deployment](https://docusaurus.io/docs/2.3.1/deployment) guides. We have verified this for GitHub Pages and Azure Static Web Apps but expect other options to be seamless as well. If you have questions or encounter any problems, please [file an issue](https://github.com/Azure-Samples/contoso-real-estate/issues/new/choose).


##  Website: Testing Motivation

The goal of the developer guide is to help you navigate the open-source repository from definition (of user scenario) to development, deployment, and devops needs. Since the codebase is fairly complex and likely to evolve, it requires us to keep the documentation in sync and validate it regularly against the code base itself.

This is where integrated end-to-end tests can help. We can validate:
 - existence of specific pages (routes) in website content
 - existence of resources (images, reports) linked in content
 - accessibility compliance of website with respect to standards

We can also use the test harness in future to explore ideas around:
 - _test-driven documentation_ where we create "stubs" for desired content contributions, with tests to validate content meets requirements.
 - _automated refresh of static assets_ e.g., capture screenshots on code changes
 - _AI-driven content contributions_ e.g., add explainers to code fenced blocks

## Website: Testing Execution 

We'll use [Playwright](https://playwright.dev) for our testing harness here as well.




## Feedback and Contributions

