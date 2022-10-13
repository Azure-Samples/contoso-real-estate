param environmentName string
param location string = resourceGroup().location

param cosmosConnectionStringKey string = 'AZURE-COSMOS-CONNECTION-STRING'
param keyVaultName string
@allowed([ 'GlobalDocumentDB', 'MongoDB', 'Parse' ])
param kind string

var abbrs = loadJsonContent('../../abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2022-05-15' = {
  name: '${abbrs.documentDBDatabaseAccounts}${resourceToken}'
  kind: kind
  location: location
  tags: tags
  properties: {
    consistencyPolicy: { defaultConsistencyLevel: 'Session' }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: false
    enableMultipleWriteLocations: false
    apiProperties: (kind == 'MongoDB') ? { serverVersion: '4.0' } : {}
    capabilities: [ { name: 'EnableServerless' } ]
  }
}

resource cosmosConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: cosmosConnectionStringKey
  properties: {
    value: cosmos.listConnectionStrings().connectionStrings[0].connectionString
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output cosmosEndpoint string = cosmos.properties.documentEndpoint
output cosmosConnectionStringKey string = cosmosConnectionStringKey
output cosmosResourceId string = cosmos.id
