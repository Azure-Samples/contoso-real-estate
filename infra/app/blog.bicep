param location string = resourceGroup().location
param applicationInsightsName string = ''
param serviceName string = 'blog'
param cmsUrl string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param name string

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    environmentName: name
    serviceName: serviceName
    location: location
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'NEXT_PUBLIC_STRAPI_API_URL'
        value: cmsUrl
      }
    ]
    imageName: !empty(imageName) ? imageName : 'nginx:latest'
    targetPort: 80
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

output WEB_BLOG_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output WEB_BLOG_NAME string = app.outputs.name
output WEB_BLOG_URI string = app.outputs.uri
output WEB_BLOG_IMAGE_NAME string = app.outputs.imageName
