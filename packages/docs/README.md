# Contoso Real Estate: Developer Guide

> 🚧 **WORK IN PROGRESS:** 
_This package is currently under active development. Contributions will be welcomed once we release the first stable version_.

## About This Package

This is the "documentation" package for the Contoso Real Estate reference sample. It currently has 2 components:

 - **`website/`** | this is a _static website_ that provides a developer guide for self-guided exploration of the documentation from _design_ to _deployment_ steps. For more details, read the [website/README](website/README.md).
 
 - **`training/`** | this point to _interactive workshops_ that help you explore the sample in a hands-on, step-by-step manner ex: _Learn Live_ events. For more details, read the [training/README](website/README.md).
 

## About: Website

The source can be found under `website/` and a detailed description of the setup and configuration can be found in [`website/README.md`](website/README.md). 

1. The site features an interactive developer guide documenting the developer experience from defining the problem to deploying the solution. Think of it as static documentation.
2. The site is built using [Docusaurus](https://docusaurus.io) with content authored in Markdown or MDX (JSX-flavored Markdown), allowing us to add interactive React components if needed (ex: Swagger-based API docs)
3. The site has built-in support for [Playwright](https://playwright.dev) tests to validate that content is accessible, has no broken links and has a desired workflow (valid routes). _They are not part of the E2E testing strategy for the Contoso Real Estate application (those tests are in: `packages/testing`)_.

**🚀 | QUICKSTART** 

The recommended use of the website is by launching a local dev server for preview as shown below, either within Codespaces on in your local development environment.

```bash
# Requires Node.js v18+.
# We recommend using nvm to install and manage versions
$ nvm use --lts
Now using node v18.17.0 (npm v9.6.7)

# Switch to website folder and install dependencies
$ cd website/
$ npm install

# Run the dev server
# Browser should launch automatically to the URL shown
$ npx docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/

# 🚀 Congratulations! You are previewing the dev guide.
# Any changes made in website/* will be reflected instantly

```

Docusaurus does provide [Deployment guidance](https://docusaurus.io/docs/deployment) if you want to deploy this to a static hosting service like Azure Static Web Apps or GitHub Pages. _If you go this route, we recommend you do this in a personal fork and setup GitHub Actions for automating build/deploy_.  Here's how you build for production:

```bash
# Create a production-ready static build of website
$ cd website/
$ npm install
$ npm run build
...
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.

# Preview the build version locally
# If default port 3000 is in use, it will automatically pick another.
# Browser will launch automatically to the URL shown
$ npm run serve 

[WARNING] Something is already running on port 3000. Probably:
Would you like to run the app on another port instead? … yes
[SUCCESS] Serving "build" directory at: http://localhost:3001/
```




## About the Website

This is an interactive _developer guide_ for the Contoso Real Estate application. It provides more detailed documentation -- from application requirements and user scenarios to implentation services and developer experience -- for hands-on exploration of this open-source sample.

Content is built using theplatform, a popular static site generation platform that supports content in both Markdown and MDX (JSX-flavored Markdown). To learn more about how this was setup, read [website/README.md](website/README.md).

The website also has built-in  that are **independent of** the test suite for the Contoso Real Estate app in `packages/testing` package. They are meant for validating website accessibility and functionality - and are not part of the end-to-end testing strategy for the reference sample itself. To learn more about the website testing focus and setup, read [website/README.TESTING.md](website/README.TESTING.md).

### Preview The Website

You need Node.js v18+. We recommend using `nvm` to manage your Node.js installs, and using the `lts` (long-term support) version where possible.

```bash
$ nvm use --lts
Now using node v18.17.0 (npm v9.6.7)
```

Change to the `website/` folder and install dependencies.

```bash
$ cd website
$ npm install
```

Start the development server 
```bash
$ npx docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

Docusaurus runs the preview server on port `3000` by default. If that is already in use, it will ask to use an alternative port seamlessly. In either case _it should launch the preview site inyour default browser automatically_.

> 🚀 | Congratulations!! Your website is running!


### Deploy the Website

You can also choose to deploy the website to a static site hosting service **from your own fork**.

 - We verified this works with GitHub Pages and Azure Static Web Apps - and recommend using GitHub Actions for automated deploys with code changes. 
 - Docusaurus also has [Deployment guidance](https://docusaurus.io/docs/deployment) for other hosting options if you have a preferred provider.

## Want to help?

Want to file a bug, contribute code or content, or improve the documentation and training resources? Excellent! 
 - Read up on our guidelines for [contributing](./CONTRIBUTING.md).
 - Check out [open issues](https://github.com/Azure-Samples/contoso-real-estate/issues) that could use help.
 - File [a new issue]().