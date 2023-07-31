// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {

  // ------- Required Fields -------
  title: 'Contoso Real Estate: Developer Guide',
  url: 'https://azure-samples.github.io',
  baseUrl: '/',  // set this to '/contoso-real-estate/' for GitHub pages deployment

  // ------- Optional: deploy related -------
  organizationName: 'Azure-Samples',  // needed only for GitHub Pages deployment
  projectName: 'contoso-real-estate', // -- ditto --
  deploymentBranch: "gh-pages",

  //------- Optional: build checks -----
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  //------ Optional: Other fields -----
  tagline: 'Build enterprise-grade composable web apps on Azure',
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  //------- Optional: Configure theme (presets = plugin bundles) ----
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({

        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
        },

        blog: false,

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },

        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },

      }),
    ],
  ],

  //------- Optional: Configure theme (UI elements))----
  // See:  https://docusaurus.io/docs/api/themes/configuration
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

      // Theme mode (light/dark or system default)
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },

      // Meta image (og:image and twitter:image default)
      image: 'img/docusaurus-social-card.jpg',

      // Other Metadata (use to override existing <meta> tags)
      metadata: [
        // { name: 'twitter:card', content: 'summary'}
      ],

      // Sidebar: https://docusaurus.io/docs/sidebar#theme-configuration
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },

      // Navbar: https://docusaurus.io/docs/api/themes/configuration#navbar
      navbar: {

        title: 'Contoso Real Estate',

        logo: {
          alt: 'Contoso Real Estate Application Logo',
          src: 'img/logo.svg',
          target: "_self",
          width: 32,
          height: 32,
        },

        style: "primary", // "dark" or "primary"

        items: [
          { href: "/api", position: "right", label: "API"},
          { href: "/training", position: "right", label: "Training"},

          /* === START: Comment out to remove from navbar === *
          { to: "/define", label: "Define", position: "left" },
          { to: "/scenarios", label: "Develop", position: "left" },
          { to: "/test", label: "Test", position: "left" },
          { to: "/monitor", label: "Monitor", position: "left" },
          { to: "/optimize", label: "Optimize", position: "left" },

          { href: "/azure", position: "right", label: "Azure" },
          { href: "/pricing", position: "right", label: "Pricing"},
          {
            position: "right",
            label: "Reporting",
            items: [
              {
                href: "/reports/index.html",
                label: "Playwright",
                target: "_blank",
              },
              {
                href: "/lighthouse",
                label: "Lighthouse",
                target: "_blank",
              },
            ],
          },

          {
            type: 'docSidebar',
            sidebarId: 'dataSidebar',
            position: 'right',
            label: 'Data',
          },
          /* === END: Comment out to remove from navbar */

          {
            type: 'docSidebar',
            sidebarId: 'guideSidebar',
            position: 'left',
            label: 'Guide',
          },
          {
            href: "https://github.com/Azure-Samples/contoso-real-estate",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },

      // Footer: https://docusaurus.io/docs/api/themes/configuration#footer-1
      footer: {

        style: 'dark', // "dark" or "light"

        logo: {
          alt: 'Contoso Real Estate Application Logo',
          src: 'img/logo.svg',
          href: 'https://opensource.fb.com',
          width: 160,
          height: 51,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Microsoft - Made with ♥️ by DevDiv & JS Advocacy`,
        links: [],
      },

      // Mermaid: https://docusaurus.io/docs/markdown-features/diagrams#configuration
      // Theming: https://mermaid.js.org/config/theming.html
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'forest'
        },
        options: {
          maxTextSize: 50,
        },
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

    }),

  //------- Optional: Configure plugins ----
  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size.
        steps: 2, // #images b/w min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],

  //------- Optional: Configure Mermaid ----
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

};

module.exports = config;
