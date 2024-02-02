export const environment = {
  production: true,

  // Note: this placeholder will be replaced by the actual URL during the build process.
  // If you hard-code the URL here, it will be used instead of the placeholder and
  // no replacement will be made.
  blogUrl: "{{SERVICE_BLOG_URI_PLACEHOLDER}}",
  strapiGraphQlUri: "{{SERVICE_CMS_URI_PLACEHOLDER}}/graphql",
  aiEnableChat: "{{AI_ENABLE_CHAT_PLACEHOLDER}}",
  aiChatApiUri: "{{AI_CHAT_API_URI_PLACEHOLDER}}",
  notificationUrl: "{{WEB_PUB_SUB_URL_PLACEHOLDER}}",
};
