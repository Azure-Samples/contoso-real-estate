
@description('Specifies a project name that is used to generate the Event Grid name.')
param name string
param location string = resourceGroup().location
param storageAccountId string
param endpoint string
param tags object = {}
param eventSubName string

resource systemTopic 'Microsoft.EventGrid/systemTopics@2021-12-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    source: storageAccountId
    topicType: 'Microsoft.Storage.StorageAccounts'
  }
}

resource eventSubscription 'Microsoft.EventGrid/systemTopics/eventSubscriptions@2021-12-01' = {
  parent: systemTopic
  name: eventSubName
  properties: {
    destination: {
      properties: {
        endpointUrl: endpoint
      }
      endpointType: 'WebHook'
    }
    filter: {
      includedEventTypes: [
        'Microsoft.Storage.BlobCreated'
        'Microsoft.Storage.BlobDeleted'
      ]
    }
  }
}
