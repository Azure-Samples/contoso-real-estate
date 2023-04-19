
@description('Specifies a project name that is used to generate the Event Grid name.')
param name string
param location string = resourceGroup().location
param tags object = {}
param storageAccountName string

module events '../core/pubsub/event-grid.bicep' = {
  name: 'events'
  params: {
    name: name
    location: location
    tags: tags
    endpoint: ''
    eventSubName: name
    storageAccountId: storageAccount.id
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' existing = {
  name: storageAccountName
}
