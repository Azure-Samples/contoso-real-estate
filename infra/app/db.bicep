param accountName string
param location string = resourceGroup().location
param tags object = {}

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
param databaseName string = ''
param keyVaultName string

// Because databaseName is optional in main.bicep, we make sure the database name is set here.
var defaultDatabaseName = 'Todo'
var actualDatabaseName = !empty(databaseName) ? databaseName : defaultDatabaseName

module cosmos '../core/database/cosmos/mongo/cosmos-mongo-db.bicep' = {
  name: 'cosmos-mongo'
  params: {
    accountName: accountName
    databaseName: actualDatabaseName
    location: location
    collections: collections
    keyVaultName: keyVaultName
    tags: tags
  }
}

output connectionStringKey string = cosmos.outputs.connectionStringKey
output databaseName string = cosmos.outputs.databaseName
output endpoint string = cosmos.outputs.endpoint
