export const environment = {
  production: true,

  // Note: this placeholder will be replaced by the actual URL during the build process.
  // If you hard-code the URL here, it will be used instead of the placeholder and
  // no replacement will be made.
  blogUrl: '{{SERVICE_BLOG_URI_PLACEHOLDER}}',
  isCodespaces: process.env["CODESPACE_NAME"] ? true : false,
  strapiGraphQlUriInCodespace: `https://${process.env["CODESPACE_NAME"]}-1337.${process.env["GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"]}/graphql`,
  strapiGraphQlUriFallback: '{{SERVICE_CMS_URI_PLACEHOLDER}}/graphql'
};
