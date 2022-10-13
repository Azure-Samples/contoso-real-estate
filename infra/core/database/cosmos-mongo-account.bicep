param environmentName string
param location string = resourceGroup().location

param keyVaultName string

module cosmos 'cosmos-account.bicep' = {
  name: 'cosmos-account'
  params: {
    environmentName: environmentName
    location: location
    keyVaultName: keyVaultName
    kind: 'MongoDB'
  }
}

output cosmosEndpoint string = cosmos.outputs.cosmosEndpoint
output cosmosConnectionStringKey string = cosmos.outputs.cosmosConnectionStringKey
output cosmosResourceId string = cosmos.outputs.cosmosResourceId
