// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// CONFIG: Set for use in themeConfig: prism
//    Pick: https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

// USAGE: Config object can be accessed via React context as `{siteConfig}`
//   See: https://docusaurus.io/docs/configuration#custom-configurations
/** @type {import('@docusaurus/types').Config} */
const config = {
  // CONFIG: Add Custom Fields - globally reference them from siteConfig
  //    See: https://docusaurus.io/docs/deployment#using-environment-variables
  customFields: {
    description: "This specification defines a use case for a fictional rentals portals app.",
  },

  // CONFIG: Landing Pages uses this (also globally via siteConfig)
  title: "Contoso HR Rentals Portal",
  tagline: "A JavaScript E2E Multi-Purpose Extensible App",

  // CONIFIG; GitHub Pages or SWA => TODO: Modify below when merging
  url: "https://contoso-real-estate.github.io/",
  baseUrl: "/", // FOR GH '/contoso-real-estate/'
  deploymentBranch: "gh-pages", // FOR GH: Activate Pages in Settings
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "contoso-real-estate",
  projectName: "contoso-real-estate",

  // CONFIG: Early detection for site health
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      // -- START presets-classic options ----
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // CONFIG: docs = collections of pages, tutorials, documentation
        //    See: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs
        // Disable: set docs: false, then remove links from navbar
        // Docs-only mode:
        //     See: https://docusaurus.io/docs/docs-introduction#docs-only-mode
        // Mermaid integration:
        //  https://github.com/sjwall/mdx-mermaid
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
        },

        // CONFIG: blog = timestamped pages, tags, site feed
        //    See: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog
        // Disable: set blog: false, then remove links from navbar
        blog: false,

        // CONFIG: theme = currently using `classic`
        //    See: https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
      // -- END presets-classic options ----
    ],
  ],

  // CONFIG: theme = set properties for UI like navbar, footer, docs, copyright etc.
  //    See: https://docusaurus.io/docs/api/docusaurus-config#themeConfig
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // CONFIG: sidebar
      //    See:
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },

      // CONFIG: default theme color mode
      //    See:
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      navbar: {
        title: "Contoso Rentals",
        logo: {
          alt: "Contoso Rentals Logo",
          src: "/img/logo.svg",
          target: "_self",
          width: 32,
          height: 32,
        },
        style: "primary",
        items: [
          { to: "/specification", label: "Specification", position: "right" },
          { to: "/scenarios", label: "Scenarios", position: "right" },
          {
            href: "https://github.com/nitya/contoso-real-estate",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },

      footer: {
        style: "light",
        copyright: `Copyright © ${new Date().getFullYear()} Microsoft - Made with ♥️ by DevDiv & JS Advocacy`,
        links: [],
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
