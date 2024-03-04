param name string
param location string = resourceGroup().location
param tags object = {}
param serviceName string = 'notifications'

param applicationInsightsName string
param notificationsServiceName string
param containerAppsEnvironmentName string
param containerRegistryName string
param notificationsImageName string = ''
param keyVaultName string

var targetPort = 4300

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': '${serviceName}-container-app' })
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    containerCpuCoreCount: '1.0'
    containerMemory: '2.0Gi'
    secrets: [
      {
        name: 'appinsights-cs'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'webpubsub-cs'
        value: awps.listKeys().primaryConnectionString
      }
    ]
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        secretRef: 'appinsights-cs'
      }
      {
        name: 'SERVICE_WEB_PUBSUB_CONNECTION_STRING'
        secretRef: 'webpubsub-cs'
      }
      {
        name: 'SERVICE_WEB_PUBSUB_PORT'
        value: '${targetPort}'
      }
    ]
    imageName: !empty(notificationsImageName) ? notificationsImageName : 'nginx:latest'
    keyVaultName: keyVault.name
    targetPort: targetPort
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource awps 'Microsoft.SignalRService/webPubSub@2023-02-01' existing = {
  name: notificationsServiceName
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output SERVICE_WEBPUBSUB_URI string = app.outputs.uri
output SERVICE_NOTIFICATIONS_IMAGE_NAME string = app.outputs.imageName
