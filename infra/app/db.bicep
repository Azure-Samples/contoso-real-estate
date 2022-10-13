param environmentName string
param location string = resourceGroup().location

param collections array = [
  {
    name: 'TodoList'
    id: 'TodoList'
    shardKey: 'Hash'
    indexKey: '_id'
  }
  {
    name: 'TodoItem'
    id: 'TodoItem'
    shardKey: 'Hash'
    indexKey: '_id'
  }
]
param cosmosDatabaseName string = 'Todo'
param keyVaultName string

module cosmos '../core/database/cosmos-mongo-db.bicep' = {
  name: 'cosmos-mongo'
  params: {
    environmentName: environmentName
    location: location
    collections: collections
    cosmosDatabaseName: cosmosDatabaseName
    keyVaultName: keyVaultName
  }
}

output cosmosConnectionStringKey string = cosmos.outputs.cosmosConnectionStringKey
output cosmosDatabaseName string = cosmosDatabaseName
output cosmosEndpoint string = cosmos.outputs.cosmosEndpoint
