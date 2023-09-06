# Contoso Real Estate: Developer Guide

> 🚧 **This is a Work in Progress:** <br/>
_Once we commit a stable first version, this notice will be removed and package opened to contributions_.

## ℹ️ | About This Package 

This is the "developer guide" documentation package for the Contoso Real Estate reference sample. It has 2 components:

 - **`website/`** | source for the _static website_ hosting a developer guide for self-guided exploration of documentation from _design_ to _deployment_ steps. See [website/README](website/README.md) for details.
 
 - **`training/`** | content for _interactive workshops_ to explore the samples in a hands-on, step-by-step manner ex: _Learn Live_ events. See [training/README](website/README.md).
 

## 🚀 | Local Preview

We recommend using the dev server to view the guide locally. This command will start the dev server _and_ launch the browser to the correct preview URL.

```bash
# Requires Node.js v18+.
# Recommend using nvm to manage versions
$ nvm use --lts
Now using node v18.17.0 (npm v9.6.7)

# Install dependencies
$ cd website/
$ npm install

# Run dev server (should launch browser)
$ npx docusaurus start
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/

# 🚀 Congratulations! 
# You should be previewing the dev guide on browser
```

## 🚀 | Production Build

You can build the website for production deployment and validate that build with a local preview as well:

```bash
# Requires Node.js v18+ 
# Build the static site for production
$ cd website/
$ npm install
$ npm run build
...
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` command to test your build locally.

# Preview  the production build locally
# Will attempt to run this on port 3000 (default)
$ npm run serve 

# You will be prompted if port is unavailable
# Browser is automatically launched to the 
# preview server URL as shown.
[WARNING] Something is already running on port 3000. Probably:
Would you like to run the app on another port instead? … yes
[SUCCESS] Serving "build" directory at: http://localhost:3001/
```
The build can now be deployed to suitable hosting services. Check out the Docusaurus [Deployment](https://docusaurus.io/docs/deployment) documentation for service-specific guides. We verified this works with GitHub Pages and Azure Static Web Apps.

Since this is an open-source repo focused on an engineering sample, we are not actively hosting the developer guide ourselves. However, we encourage you to explore deployment options in your personal fork - and use GitHub Actions to automate the build/deploy workflow for convenience.

## 🎭 | Playwright Testing

[Playwright](https://playwright.dev) is a reliable end-to-end testing framework for modern web apps that supports test automation and cross-browser testing along with rich tooling to make the developer e2e testing experience seamless and productive. 

```bash
# Get the Playwright version
$ npx playwright --version
Version 1.36.2

# Get usage help for available Playwright CLI commands and options
$ npx playwright --help
Usage: npx playwright [options] [command] ....

# Get usage help for a specific Playwright CLI command (ex: test)
$ npx playwright test --help
Usage: npx playwright test [options] [test-filter...] 

run tests with Playwright Test
...
```

The `package/docs` workspace now has a local set of Playwright tests for the _developer guide_ website. These are intentionally kept separate from the Playwrite e2e tests suite for the _Contoso Real Estate_ sample app located in the `package/testing` workspace. 

As a result, there may be minor variations in how the two test runners are configured, and the kinds of test suites that are defined. To explore how the **website** tests are setup, configured, and run, go to [website/README.TESTING](./website/README.TESTING.md).


## Want to help?

Want to file a bug, contribute code or content, or improve the documentation and training resources? Excellent! 
 - Read up on our guidelines for [contributing](./CONTRIBUTING.md).
 - Check out [open issues](https://github.com/Azure-Samples/contoso-real-estate/issues) that could use help.
 - File [a new issue](https://github.com/Azure-Samples/contoso-real-estate/issues/new/choose) to start a related discussion.