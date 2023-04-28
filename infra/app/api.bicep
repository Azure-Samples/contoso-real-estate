param name string
param location string = resourceGroup().location
param tags object = {}

param allowedOrigins array = []
param applicationInsightsName string = ''
param appServicePlanId string
param appSettings object = {}
param keyVaultName string
param serviceName string = 'api'
param storageAccountName string
param stripeServiceUrl string

// TODO: enable Event Grid when endpoints are available
param eventGridName string

module api '../core/host/functions.bicep' = {
  name: '${serviceName}-functions-node-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    allowedOrigins: allowedOrigins
    alwaysOn: false
    appSettings: union(appSettings, {
      // TODO: enable Event Grid when endpoints are available
      // EVENT_GRID_ENDPOINT: eventGrid.properties.endpoint
      // EVENT_GRID_TOPIC_KEY: eventGrid.listKeys().key1

      // Note:  this property is passed as params to avoid circular dependency (in maim.bicep)
      STRIPE_SERVICE_URL: stripeServiceUrl
    })
    applicationInsightsName: applicationInsightsName
    appServicePlanId: appServicePlanId
    keyVaultName: keyVaultName
    runtimeName: 'node'
    runtimeVersion: '16'
    storageAccountName: storageAccountName
  }
}

// TODO: enable Event Grid when endpoints are available
// resource eventGrid 'Microsoft.EventGrid/systemTopics@2020-10-15-preview' existing = {
//   name: eventGridName
// }

output SERVICE_API_IDENTITY_PRINCIPAL_ID string = api.outputs.identityPrincipalId
output SERVICE_API_NAME string = api.outputs.name
output SERVICE_API_URI string = api.outputs.uri
