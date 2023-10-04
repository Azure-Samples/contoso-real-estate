param name string
param location string = resourceGroup().location
param tags object = {}

param keyVaultName string
param connectionStringKey string = 'AZURE-COSMOS-CONNECTION-STRING-KV'

module cosmos '../../cosmos/cosmos-account.bicep' = {
  name: 'cosmos-account'
  params: {
    name: name
    location: location
    connectionStringKey: connectionStringKey
    keyVaultName: keyVaultName
    kind: 'MongoDB'
    tags: tags
  }
}

resource cosmosConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: connectionStringKey
  properties: {
    value: cosmos.outputs.connectionString
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output connectionString string = cosmos.outputs.connectionString
output connectionStringKey string = cosmos.outputs.connectionStringKey
output endpoint string = cosmos.outputs.endpoint
output id string = cosmos.outputs.id
