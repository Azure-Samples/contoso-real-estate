param environmentName string
param location string = resourceGroup().location

param collections array = []
param cosmosDatabaseName string
param cosmosConnectionStringKey string = 'AZURE-COSMOS-CONNECTION-STRING'
param keyVaultName string

var abbrs = loadJsonContent('../../abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

module cosmos 'cosmos-mongo-account.bicep' = {
  name: 'cosmos-mongo-account'
  params: {
    environmentName: environmentName
    location: location
    keyVaultName: keyVaultName
  }
}

resource database 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2022-05-15' = {
  name: '${abbrs.documentDBDatabaseAccounts}${resourceToken}/${cosmosDatabaseName}'
  properties: {
    resource: { id: cosmosDatabaseName }
  }

  resource list 'collections' = [for collection in collections: {
    name: collection.name
    properties: {
      resource: {
        id: collection.id
        shardKey: { _id: collection.shardKey }
        indexes: [ { key: { keys: [ collection.indexKey ] } } ]
      }
    }
  }]

  dependsOn: [
    cosmos
  ]
}

output cosmosConnectionStringKey string = cosmosConnectionStringKey
output cosmosDatabaseName string = cosmosDatabaseName
output cosmosEndpoint string = cosmos.outputs.cosmosEndpoint
