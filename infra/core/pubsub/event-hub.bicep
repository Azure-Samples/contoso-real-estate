param tags object = {}

@description('Specifies a project name that is used to generate the Event Hub name and the Namespace name.')
param name string

@description('Specifies the Azure location for event hubs.')
param location string = resourceGroup().location

@description('Specifies the messaging tier for Event Hub Namespace.')
@allowed([
  'Basic'
  'Standard'
])
param eventHubSku string = 'Basic'
param keyVaultName string
param connectionStringKey string = 'AZURE-EVENT-HUB-CONNECTION-STRING-KV'
var eventHubNamespaceName = '${name}ns'
var eventHubName = name

resource eventHubNamespace 'Microsoft.EventHub/namespaces@2022-10-01-preview' = {
  name: eventHubNamespaceName
  location: location
  tags: tags
  sku: {
    name: eventHubSku
    tier: eventHubSku
    capacity: 1
  }
  properties: {
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
  }
}

resource eventHub 'Microsoft.EventHub/namespaces/eventhubs@2022-10-01-preview' = {
  parent: eventHubNamespace
  name: eventHubName
  properties: {
    messageRetentionInDays: 1 // "1" for Basic tier
    partitionCount: 1
  }
}

resource cosmosConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: connectionStringKey
  properties: {
    value: eventHub.listKeys(eventHubNamespace.id).primaryConnectionString
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output SERVICE_EVENT_HUB_ENDPOINT string = '${eventHubNamespace.name}.servicebus.windows.net'
output SERVICE_EVENT_HUB_CONNECTION_STRING_KEY string = connectionStringKey
