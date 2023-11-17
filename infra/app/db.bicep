param accountName string
param location string = resourceGroup().location
param tags object = {}

param databaseName string = ''
param keyVaultName string

param keyVaultSecretName string = 'AZURE-COSMOS-CONNECTION-STRING'

// Because databaseName is optional in main.bicep, we make sure the database name is set here.
var defaultDatabaseName = 'contoso-real-estate'
var actualDatabaseName = !empty(databaseName) ? databaseName : defaultDatabaseName

module cosmos '../core/database/cosmos/mongo/cosmos-mongo-db.bicep' = {
  name: 'cosmos-mongo'
  params: {
    accountName: accountName
    databaseName: actualDatabaseName
    location: location
    keyVaultName: keyVaultName
    tags: tags
  }
}

output connectionStringKey string = keyVaultSecretName
output databaseName string = cosmos.outputs.databaseName
output endpoint string = cosmos.outputs.endpoint
