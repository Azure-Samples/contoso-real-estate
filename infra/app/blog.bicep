param name string
param location string = resourceGroup().location
param tags object = {}

param applicationInsightsName string
param cmsUrl string
param portalUrl string
param containerAppsEnvironmentName string
param containerRegistryName string
param blogImageName string = ''
param keyVaultName string
param serviceName string = 'blog'


module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    containerCpuCoreCount: '1.0'
    containerMemory: '2.0Gi'
    secrets: [
      {
        name: 'appinsights-cs'
        value: applicationInsights.properties.ConnectionString
      }
    ]
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        secretRef: 'appinsights-cs'
      }
      {
        name: 'NEXT_PUBLIC_STRAPI_API_URL'
        value: cmsUrl
      }
      {
        name: 'NEXT_PUBLIC_PORTAL_URL'
        value: portalUrl
      }
    ]
    imageName: !empty(blogImageName) ? blogImageName : 'nginx:latest'
    keyVaultName: keyVault.name
    targetPort: 3000
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output SERVICE_BLOG_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output SERVICE_BLOG_NAME string = app.outputs.name
output SERVICE_BLOG_URI string = app.outputs.uri
output SERVICE_BLOG_IMAGE_NAME string = app.outputs.imageName
