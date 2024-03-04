param name string
param location string = resourceGroup().location
param tags object = {}
param serviceName string = 'notifications'

module notifications '../core/pubsub/web-pub-sub.bicep' = {
  name: '${serviceName}-awps-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': '${serviceName}-awps' })
    sku: 'Free_F1'
  }
}

output SERVICE_WEBPUBSUB_NAME string = notifications.outputs.name
